"use strict";

const { Controller } = require("egg");

const getBankReportsRules = {
    page_index: {
        type: "number",
        required: true,
    },
    page_size: {
        type: "number",
        required: true,
    },
    pay_currency: {
        type: "enum",
        required: true,
        values: [
            "CNY",
            "THB",
        ]
    }
    // user_code: {
    //     type: "string",
    //     required: false,
    // },
    // waybill_number: {
    //     type: "string",
    //     required: false,
    // },
    // stuffing_number: {
    //     type: "string",
    //     required: false,
    // },
    // status: {
    //     type: "array",
    //     itemType: "enum",
    //     rule: {
    //         type: "enum",
    //         required: false,
    //         values: [
    //             "client_cost_to_be_record",
    //             "warehouse_cost_to_be_record",
    //             "finance_cost_to_be_record",
    //             "cost_to_be_pay",
    //             "cost_has_payed",
    //         ],
    //     },
    //     required: false,
    // },
};

class BankReportController extends Controller {
    get bankReportService() {
        return this.ctx.service.bankReport;
    }

    // 获取银行账列表
    async getBankReports() {
        const { ctx } = this;
        const params = ctx.helper.filterParams(
            getBankReportsRules,
            Object.assign({}, ctx.request.body)
        );
        ctx.validate(getBankReportsRules, params);
        const res = await this.bankReportService.getBankReports(params);
        ctx.body = res;
    }
}

module.exports = BankReportController;
