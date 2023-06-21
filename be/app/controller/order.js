"use strict";

const { Controller } = require("egg");

const getOrdersRules = {
  page_index: {
    type: "number",
    required: true,
  },
  page_size: {
    type: "number",
    required: true,
  },
  user_code: {
    type: "string",
    required: false,
  },
  waybill_number: {
    type: "string",
    required: false,
  },
  stuffing_number: {
    type: "string",
    required: false,
  },
  status: {
    type: "array",
    itemType: "enum",
    rule: {
      type: "enum",
      required: false,
      values: [
        "client_cost_to_be_record",
        "warehouse_cost_to_be_record",
        "cost_to_be_pay",
        "cost_has_payed",
      ],
    },
    required: false,
  },
};

const deleteOrderRules = {
  id: {
    type: "number",
    required: true,
  },
};

class OrderController extends Controller {
  get orderService() {
    return this.ctx.service.order;
  }

  // 创建订单列表
  async createOrders() {
    const { ctx } = this;
    const res = await this.orderService.createOrders();
    ctx.body = res;
  }

  // 获取订单列表
  async getOrders() {
    const { ctx } = this;
    const params = ctx.helper.filterParams(
      getOrdersRules,
      Object.assign({}, ctx.request.body)
    );
    ctx.validate(getOrdersRules, params);
    const res = await this.orderService.getOrders(params);
    ctx.body = res;
  }

  // 删除订单
  async deleteOrder() {
    const { ctx } = this;
    const params = ctx.helper.filterParams(
      deleteOrderRules,
      Object.assign({}, ctx.params)
    );
    ctx.validate(deleteOrderRules, params);
    const res = await this.orderService.deleteOrder(params);
    ctx.body = res;
  }
}

module.exports = OrderController;
