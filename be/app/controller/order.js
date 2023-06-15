"use strict";

const { Controller } = require("egg");

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
}

module.exports = OrderController;
