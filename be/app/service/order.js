"use strict";

const Service = require("egg").Service;
const xlsx = require("node-xlsx");
const lodash = require("lodash");

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
      const receive_goods_date = item[1];
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
}

module.exports = OrderService;
