"use strict";

const Service = require("egg").Service;
const lodash = require("lodash");
const dayjs = require("dayjs");
const nodeXlsx = require("node-xlsx");
const xlsx = require("xlsx");
const xlsxStyle = require("xlsx-style");
const math = require('math.js')

class OrderService extends Service {
  get ordersModel() {
    return this.app.model.Orders;
  }

  async createOrders() {
    const { ctx } = this;
    // 权限校验
    const safeRoles = ["admin", "finance", "staff"];
    if (!safeRoles.includes(ctx.state.user.role)) {
      ctx.throw(403, "无权限");
    }
    // 业务逻辑
    const file = ctx.request.files[0];
    const sheets = nodeXlsx.parse(file.filepath);
    const { data } = sheets[0];
    const defaultHeader = [
      "客户代号",
      "收货日期",
      "运单号",
      "货号",
      "货物名称",
      "运输方式",
      "数量",
      "件数",
      "备注",
      "重量/KG",
      "内部尺寸/CM",
    ];
    const header = data[0];
    const isHeaderValid = lodash.isEqual(header, defaultHeader);
    if (!isHeaderValid) {
      ctx.throw(422, "表格不符合模板要求");
    }
    // 创建订单
    const body = data.slice(1, data.length);
    for (const item of body) {
      const user_code = item[0];
      const receive_goods_date = dayjs("1900-01-01")
        .add(Number(item[1]) - 2, "day")
        .format("YYYY-MM-DD");
      const waybill_number = item[2];
      const goods_number = item[3];
      const goods_name = item[4];
      const transport_mode = item[5];
      const count = item[6];
      const number = item[7];
      const description = item[8];
      const weight = item[9];
      const inner_size_length = item[10];
      const inner_size_width = item[11];
      const inner_size_height = item[12];
      const originVolume = (inner_size_length * inner_size_width * inner_size_height) / 1000000
      let volume = +Number(originVolume).toFixed(3)
      if (volume == 0) volume = 0.001 // 体积过小，会被约成 0
      await this.ordersModel.create({
        user_code,
        receive_goods_date,
        waybill_number,
        goods_number,
        goods_name,
        transport_mode,
        count,
        number,
        description,
        weight,
        inner_size_length,
        inner_size_width,
        inner_size_height,
        volume, // 保留三位小数
      });
    }
    ctx.status = 200;
  }

  async updateOrder(params) {
    const { ctx } = this;
    let safeRoles, status;
    // 状态后移一个节点
    switch (params.status) {
      case "client_cost_to_be_record": {
        safeRoles = ["admin", "finance", "staff"];
        status = "warehouse_cost_to_be_record";
        break;
      }
      case "warehouse_cost_to_be_record": {
        safeRoles = ["admin", "finance", "staff"];
        status = "finance_cost_to_be_record";
        break;
      }
      case "finance_cost_to_be_record": {
        safeRoles = ["admin", "finance"];
        status = "cost_to_be_pay";
        break;
      }
      case "cost_to_be_pay": {
        safeRoles = ["admin", "finance"];
        status = "cost_has_payed";
        break;
      }
      default: {
        ctx.throw(422);
      }
    }
    // 权限校验
    if (!safeRoles.includes(ctx.state.user.role)) {
      ctx.throw(403, "无权限");
    }
    // 业务逻辑
    const order = await this.ordersModel.findOne({
      where: {
        id: params.id,
      },
    });
    // 未找到数据
    if (!order || order.is_delete) {
      ctx.throw(404, "不存在该订单");
    }
    // 校验不可修改项
    if (params.status !== order.status) {
      ctx.throw(422, "订单不可修改");
    }
    // 更新数据
    let data = {};
    switch (params.status) {
      case "client_cost_to_be_record": {
        const client_freight = math.format(
          (order.number * order.volume * params.unit_price + params.packing_cost),
          { precision: 14 }
        )
        data = { client_freight };
        break;
      }
      case "warehouse_cost_to_be_record": {
        const warehouse_volumn =
          (params.warehouse_size_length *
            params.warehouse_size_width *
            params.warehouse_size_height) /
          1000000;
        const warehouse_freight = math.format((
          order.number * warehouse_volumn * params.cost_unit_price +
          params.cost_packing_cost), { precision: 14 });
        data = {
          warehouse_volumn,
          warehouse_freight,
        };
      }
      case "finance_cost_to_be_record": {
        if (
          (lodash.isNumber(params.good_value) &&
            !lodash.isNumber(params.rate)) ||
          (!lodash.isNumber(params.good_value) && lodash.isNumber(params.rate))
        ) {
          ctx.throw(422, "货值和费率需同时填写");
        }
        if (
          lodash.isNumber(params.good_value) &&
          lodash.isNumber(params.rate)
        ) {
          const insurance = params.good_value * params.rate;
          data = { insurance };
        }
        break;
      }
    }

    const newParams = Object.assign({}, params, { status }, data)
    if (status === 'cost_has_payed') {
      // 订单完成，除了更新订单状态外，需要同步更新银行账
      let updateOrderTransaction = null;
      try {
        // 创建订单事务
        updateOrderTransaction = await this.ctx.model.transaction();
        // 更新订单状态
        await this.ordersModel.update(newParams, {
          where: {
            id: params.id,
          },
          transaction: updateOrderTransaction,
        });
        // 创建银行账
        const data = await this.ctx.service.bankReport.getCreateBankReportData({
          bankIn: order.client_freight,
          bankReportDate: params.payed_date,
          bankOut: params.bank_out,
          description: params.description,
          firstLevelClassify: 'cost_receivable',
          secondLevelDetail: 'freight_cost',
          payCurrency: params.pay_currency
        })
        await this.app.model.BankReports.create(data, {
          transaction: updateOrderTransaction,
        });

        await updateOrderTransaction.commit();

        ctx.status = 200;
      } catch (error) {
        await updateOrderTransaction.rollback();
        ctx.throw(500);
      }
    } else {
      // 订单未完成，正常更新订单状态即可
      order.update(newParams);
    }

    ctx.status = 200;
  }

  async downloadDeliveryBill(params) {
    const { ctx, app } = this;
    // 权限校验
    const safeRoles = ["admin", "finance", "staff"];
    if (!safeRoles.includes(ctx.state.user.role)) {
      ctx.throw(403, "noAuth");
    }
    // 业务逻辑
    // 查询数据
    const { Op } = app.Sequelize;
    const orders = await this.ordersModel.findAll({
      where: {
        id: {
          [Op.in]: params.ids,
        },
      },
    });
    // 校验数据
    // 未选中订单
    if (orders.length === 0) {
      ctx.throw(422, "downloadDeliveryBillNoOrderFailed");
    }
    // 订单状态要求为待付款/已付款
    if (
      orders.some(
        (order) =>
          order.status !== "cost_to_be_pay" && order.status !== "cost_has_payed"
      )
    ) {
      ctx.throw(422, "downloadDeliveryBillStatusFailed");
    }
    // 用户代号要求为同一个
    if (orders.some((order) => order.user_code !== orders[0].user_code)) {
      ctx.throw(422, "downloadDeliveryBillUserCodeFailed");
    }
    // 装柜号要求为同一个
    if (
      orders.some(
        (order) => order.stuffing_number !== orders[0].stuffing_number
      )
    ) {
      ctx.throw(422, "downloadDeliveryBillStuffingNumberFailed");
    }

    // 获取订单用户
    const user = await this.app.model.Users.findOne({
      where: {
        username: orders[0].user_code,
      }
    });

    // 导出 Excel
    const workbook = xlsx.utils.book_new();
    const dateStrs = new Date().toDateString().split(" ");
    const worksheet = xlsx.utils.aoa_to_sheet([
      ["HTX", "", "", "送货单ใบสงของ", "", "", "", "", "", "NO:", orders[0]?.waybill_number || ''],
      ["", "宏泰兴国际货运", "", "", "", "", "", "", "", "", `YW${orders[0]?.goods_number || ''}`],
      ["", "", "", "", "", "", "", "", "", "", ""],
      [
        "HONGTAIXING International Freight",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "客户ลกคา：",
        orders[0]?.user_code || "",
      ],
      [
        "发货日期วนทสนคาออก：",
        "",
        `${dateStrs[2]}-${dateStrs[1]}`,
        "",
        "",
        "",
        "",
        "",
        "",
        "电话โทร：",
        user?.phone_number || '',
      ],
      [
        "序号หมายเลข",
        "货物名称รายกานสนคา",
        "",
        "件数จำนวน",
        "重量นำหนด",
        "尺寸CM",
        "",
        "",
        "体积ควCBM",
        "单价ราคา",
        "金额จำนวนเงน",
      ],
      ...orders.map((order, index) => [
        index + 1,
        order.goods_name,
        "",
        order.number,
        order.weight,
        order.inner_size_length,
        order.inner_size_width,
        order.inner_size_height,
        order.volume,
        order.unit_price,
        order.client_freight,
      ]),
      [
        "总计รวม",
        "",
        "",
        lodash.sum(orders.map((order) => order.number)),
        lodash.sum(orders.map((order) => order.weight)),
        "",
        "",
        "",
        lodash.sum(orders.map((order) => order.volume)),
        "",
        lodash.sum(orders.map((order) => order.client_freight)),
      ],
      [
        "送货人签名  ลายเซนผสง",
        "",
        "",
        "收货人签名  ลายเซนผรบ",
        "",
        "",
        "",
        "",
        "",
        "BU SEA",
        (orders[0]?.transport_mode || "").toLowerCase().includes('sea') ? "√" : ""
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "EK",
        (orders[0]?.transport_mode || "").toLowerCase().includes('ek') ? "√" : ""
      ],
      [
        "联系电话ตดตอ：15989894077 中国จน  0948629770 ไทย",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "注意事项：*  送货人应填写托运人及收货人地址和电话。*托运货物必须按规定包装好，否则损坏，本公司不负责任。*不得假报货名，不得夹带禁运货物、危险品、否则一切损失由托运人负责。*如货物丢失，损坏按保险金额赔偿，未投保的货物承运方按此批货物运费的三倍赔偿。*收货时请当面点清货物，事后概不负责。      หมายเหตุ：ผู้ส่งที่อยู่และเบอร์โทรศัพท์ของผู้ฝากส่งและผู้รับของไว้ของที่ฝากส่งต้องห่อไว้ให้เรียบร้อยตามกำหนดและต้องเสนอชื่อตองกับสิ่งของห้ามใส่ของต้องห้ามของอันตรายไว้กับของที่ฝากด้วยกัน มิฉะนั้นมีความเสียหายทางบริษัทไม่รับผิดชอบหากของเสียหรือหายจ่ายตามค้ำประกันของที่ไม่ได้ทำประกันทางขนส่งจ่ายค่าทดแทนสามเท่าของค่าขนส่งโปรดผู้รับของตรวจสอบสิ่งของให้เรียบร้อยทางบริษัทไม่รับผิดชอบหลังเสร็จงาน                                                                   ",
        ,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      ["", "", "", "", "", "", "", "", "", "", ""],
    ]);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // 列宽
    worksheet["!cols"] = [
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 33 },
      { wpx: 33 },
      { wpx: 33 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
    ];
    // 合并单元格
    const merges = [
      // HTX
      {
        // s 为开始
        s: {
          c: 0, // 开始列
          r: 0, // 开始行
        },
        // e 为结束
        e: {
          c: 0, // 结束列
          r: 2, // 结束行
        },
      },
      // 宏泰兴国际货运
      {
        s: {
          c: 1,
          r: 1,
        },
        e: {
          c: 2,
          r: 2,
        },
      },
      // 送货单
      {
        s: {
          c: 3,
          r: 0,
        },
        e: {
          c: 8,
          r: 2,
        },
      },
      // HONGTAIXING International Freight
      {
        s: {
          c: 0,
          r: 3,
        },
        e: {
          c: 2,
          r: 3,
        },
      },
      // 发货日期
      {
        s: {
          c: 0,
          r: 4,
        },
        e: {
          c: 1,
          r: 4,
        },
      },
      // 货物名称 表头
      {
        s: {
          c: 1,
          r: 5,
        },
        e: {
          c: 2,
          r: 5,
        },
      },
      // 尺寸CM 表头
      {
        s: {
          c: 5,
          r: 5,
        },
        e: {
          c: 7,
          r: 5,
        },
      },
      // 货物名称 总计
      {
        s: {
          c: 1,
          r: 6 + orders.length,
        },
        e: {
          c: 2,
          r: 6 + orders.length,
        },
      },
      // 送货人签名
      {
        s: {
          c: 0,
          r: 7 + orders.length,
        },
        e: {
          c: 0,
          r: 8 + orders.length,
        },
      },
      // 送货人后的空格
      {
        s: {
          c: 1,
          r: 7 + orders.length,
        },
        e: {
          c: 2,
          r: 8 + orders.length,
        },
      },
      // 收货人签名
      {
        s: {
          c: 3,
          r: 7 + orders.length,
        },
        e: {
          c: 3,
          r: 8 + orders.length,
        },
      },
      // 收货人后的空格
      {
        s: {
          c: 4,
          r: 7 + orders.length,
        },
        e: {
          c: 8,
          r: 8 + orders.length,
        },
      },
      // 联系电话
      {
        s: {
          c: 0,
          r: 9 + orders.length,
        },
        e: {
          c: 3,
          r: 9 + orders.length,
        },
      },
      // 注意事项
      {
        s: {
          c: 0,
          r: 10 + orders.length,
        },
        e: {
          c: 10,
          r: 15 + orders.length,
        },
      },
    ];
    // 货物名称 内容
    orders.forEach((_order, index) => {
      merges.push({
        s: {
          c: 1,
          r: 6 + index,
        },
        e: {
          c: 2,
          r: 6 + index,
        },
      });
    });
    worksheet["!merges"] = merges;
    // 设置样式
    // HTX
    worksheet["A1"].s = {
      font: {
        sz: 28,
        bold: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "center",
      },
    };
    // 宏泰兴国际货运
    worksheet["B2"].s = {
      font: {
        sz: 18,
        bold: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "center",
      },
    };
    // 送货单
    worksheet["D1"].s = {
      font: {
        sz: 20,
        bold: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "center",
      },
    };
    // 总计 重量
    worksheet[`E${7 + orders.length}`].s = {
      font: {
        bold: true,
        color: { rgb: "FF0000" },
      },
    };
    // 总计 体积
    worksheet[`I${7 + orders.length}`].s = {
      font: {
        bold: true,
        color: { rgb: "FF0000" },
      },
    };
    // 总计 金额
    worksheet[`K${7 + orders.length}`].s = {
      font: {
        bold: true,
        color: { rgb: "FF0000" },
      },
    };
    // 送货人签名
    worksheet[`A${8 + orders.length}`].s = {
      alignment: {
        vertical: "center",
        horizontal: "center",
        wrapText: true,
      },
    };
    // 收货人签名
    worksheet[`D${8 + orders.length}`].s = {
      alignment: {
        vertical: "center",
        horizontal: "center",
        wrapText: true,
      },
    };
    // 注意事项
    worksheet[`A${11 + orders.length}`].s = {
      font: {
        sz: 9,
      },
      alignment: {
        vertical: "center",
        horizontal: "center",
        wrapText: true,
      },
    };
    // 绘制 Excel
    const buffer = xlsxStyle.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    ctx.set("Content-Disposition", "attachment; filename=data.xlsx");
    return buffer;
  }

  async getOrders(params) {
    const { ctx, app } = this;
    // 权限校验
    const safeRoles = ["admin", "finance", "staff", "external"];
    if (!safeRoles.includes(ctx.state.user.role)) {
      ctx.throw(403, "无权限");
    }
    // 业务逻辑
    // 查询数据
    const { Op } = app.Sequelize;
    const orders = await this.ordersModel.findAndCountAll({
      where: Object.assign(
        {},
        {
          is_delete: false,
        },
        params.user_code
          ? {
            user_code: {
              [Op.like]: `%${params.user_code}%`,
            },
          }
          : {},
        params.waybill_number
          ? {
            waybill_number: {
              [Op.like]: `%${params.waybill_number}%`,
            },
          }
          : {},
        params.stuffing_number
          ? {
            stuffing_number: {
              [Op.like]: `%${params.stuffing_number}%`,
            },
          }
          : {},
        params.status
          ? {
            status: {
              [Op.in]: params.status,
            },
          }
          : {}
      ),
      ...ctx.helper.getPageParams(params.page_index, params.page_size),
      // 过滤返回数据
      attributes: {
        exclude: ["is_delete", "create_at", "update_at"],
      },
    });
    return orders;
  }

  async deleteOrder(params) {
    const { ctx } = this;
    // 权限校验
    const safeRoles = ["admin"];
    if (!safeRoles.includes(ctx.state.user.role)) {
      ctx.throw(403, "无权限");
    }
    // 业务逻辑
    const order = await this.ordersModel.findOne({
      where: {
        id: params.id,
      },
    });
    if (!order) {
      ctx.throw(404, "不存在该订单");
    }
    // 删除数据
    await order.destroy({ is_delete: true });
    ctx.status = 200;
  }
}

module.exports = OrderService;
