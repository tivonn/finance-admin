"use strict";

const { Controller } = require("egg");

const updateOrderRules = {
  id: {
    type: "number",
    required: true,
  },
  status: {
    type: "enum",
    required: true,
    values: [
      "client_cost_to_be_record",
      "warehouse_cost_to_be_record",
      "finance_cost_to_be_record",
      "cost_to_be_pay",
      "cost_has_payed",
    ],
  },
};

const updateOrderClientCostToBeRecordRules = Object.assign(
  {},
  updateOrderRules,
  {
    unit_price: {
      type: "number",
      required: true,
    },
    packing_cost: {
      type: "number",
      required: true,
    },
  }
);

const updateOrderWarehouseCostToBeRecordRules = Object.assign(
  {},
  updateOrderRules,
  {
    stuffing_number: {
      type: "number",
      required: true,
    },
    warehouse_size_length: {
      type: "number",
      required: true,
    },
    warehouse_size_width: {
      type: "number",
      required: true,
    },
    warehouse_size_height: {
      type: "number",
      required: true,
    },
    cost_unit_price: {
      type: "number",
      required: true,
    },
    cost_packing_cost: {
      type: "number",
      required: true,
    },
  }
);

const updateOrderFinanceCostToBeRecordRules = Object.assign(
  {},
  updateOrderRules,
  {
    good_value: {
      type: "number",
      required: false,
    },
    rate: {
      type: "number",
      required: false,
    },
    disbursements: {
      type: "number",
      required: true,
    },
    compensate: {
      type: "number",
      required: true,
    },
  }
);

const updateOrderCostToBePayRules = Object.assign({}, updateOrderRules, {
  payed_date: {
    type: "date",
    required: true,
  },
  pay_currency: {
    type: "enum",
    required: true,
    values: ["CNY", "THB"],
  },
});

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
        "finance_cost_to_be_record",
        "cost_to_be_pay",
        "cost_has_payed",
      ],
    },
    required: false,
  },
};

const downloadDeliveryBillRules = {
  ids: {
    type: "array",
    itemType: "number",
    required: true,
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

  // 修改订单
  async updateOrder() {
    const { ctx } = this;
    const status = ctx.request.body.status;
    let rule;
    switch (status) {
      case "client_cost_to_be_record": {
        rule = updateOrderClientCostToBeRecordRules;
        break;
      }
      case "warehouse_cost_to_be_record": {
        rule = updateOrderWarehouseCostToBeRecordRules;
        break;
      }
      case "finance_cost_to_be_record": {
        rule = updateOrderFinanceCostToBeRecordRules;
        break;
      }
      case "cost_to_be_pay": {
        rule = updateOrderCostToBePayRules;
        break;
      }
      default: {
        ctx.throw(422);
        break;
      }
    }
    const params = ctx.helper.filterParams(
      rule,
      Object.assign({}, ctx.params, ctx.request.body)
    );
    ctx.validate(rule, params);
    const res = await this.orderService.updateOrder(params);
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

  // 导出送货单
  async downloadDeliveryBill() {
    const { ctx } = this;
    const params = ctx.helper.filterParams(
      downloadDeliveryBillRules,
      Object.assign({}, ctx.request.body)
    );
    ctx.validate(downloadDeliveryBillRules, params);
    const res = await this.orderService.downloadDeliveryBill(params);
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