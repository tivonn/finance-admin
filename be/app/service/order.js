"use strict";

const Service = require("egg").Service;
const xlsx = require("node-xlsx");
const lodash = require("lodash");
const dayjs = require("dayjs");

class OrderService extends Service {
  get ordersModel() {
    return this.app.model.Orders;
  }

  async createOrders() {
    const { ctx } = this;
    // 权限校验
    const safeRoles = ["admin", "staff"];
    if (!safeRoles.includes(ctx.state.user.role)) {
      ctx.throw(403, "无权限");
    }
    // 业务逻辑
    const file = ctx.request.files[0];
    const sheets = xlsx.parse(file.filepath);
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
      const receive_goods_date = dayjs(item[1]).format("YYYY-MM-DD");
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
        volume:
          (inner_size_length * inner_size_width * inner_size_height) / 1000000,
      });
    }
    ctx.status = 200;
  }

  async updateOrder(params) {
    const { ctx } = this;
    let safeRoles, status;
    switch (params.status) {
      case "client_cost_to_be_record": {
        safeRoles = ["admin", "staff"];
        status = "warehouse_cost_to_be_record";
        break;
      }
      case "warehouse_cost_to_be_record": {
        safeRoles = ["admin", "staff"];
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
        const client_freight =
          order.number * order.volume * params.unit_price + params.packing_cost;
        data = { client_freight };
        break;
      }
      case "warehouse_cost_to_be_record": {
        const warehouse_volumn =
          (params.warehouse_size_length *
            params.warehouse_size_width *
            params.warehouse_size_height) /
          1000000;
        const warehouse_freight =
          order.number * warehouse_volumn * params.cost_unit_price +
          params.cost_packing_cost;
        data = {
          warehouse_volumn,
          warehouse_freight,
        };
      }
    }
    order.update(Object.assign({}, params, { status }, data));
    ctx.status = 200;
  }

  async downloadDeliveryBill(params) {
    const { ctx, app } = this;
    // 权限校验
    const safeRoles = ["admin", "finance"];
    if (!safeRoles.includes(ctx.state.user.role)) {
      ctx.throw(403, "无权限");
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
    if (orders.length === 0) {
      ctx.throw(422, "未选中订单");
    }
    if (
      orders.some(
        (order) =>
          order.status !== "cost_to_be_pay" && order.status !== "cost_has_payed"
      )
    ) {
      ctx.throw(422, "订单状态要求为待付款/已付款");
    }
    if (orders.some((order) => order.user_code !== orders[0].user_code)) {
      ctx.throw(422, "用户代号要求为同一个");
    }
    if (
      orders.some(
        (order) => order.stuffing_number !== orders[0].stuffing_number
      )
    ) {
      ctx.throw(422, "装柜号要求为同一个");
    }
    return orders;
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
