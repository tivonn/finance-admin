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
}

module.exports = OrderController;
