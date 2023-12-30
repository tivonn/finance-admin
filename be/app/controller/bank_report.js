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
    },
    first_level_classify: {
        type: "array",
        itemType: "enum",
        rule: {
            type: "enum",
            required: false,
            values: [
                'manage_cost', 'business_cost', 'finance_cost', 'bonus', 'cost_receivable', 'cost_payable', 'other_cost_receivable', 'cost_allot', 'cost_real_in', 'short_borrow_cost', 'other_cost_in', 'accrual_in', 'bonus_payable', 'other_cost_payable', 'other_cost_out'
            ],
        },
        required: false,
    },
    second_level_detail: {
        type: "array",
        itemType: "enum",
        rule: {
            type: "enum",
            required: false,
            values: [
                'work_cost', 'tel_cost', 'salary_cost', 'social_security_cost', 'rent_cost', 'packing_cost', 'royalty_cost', 'cash', 'middle_cost', 'accrual_cost', 'service_cost', 'all_profit_cost', 'accrual_in_cost', 'bonus', 'th_cost', 'freight_cost', 'cash_pledge', 'last_not_pay', 'not_allot_profit', 'other'
            ],
        },
        required: false,
    },
};

const createBankReportRules = {
    pay_currency: {
        type: "enum",
        required: true,
        values: [
            "CNY",
            "THB",
        ]
    },
    bank_report_date: {
        type: "date",
        required: true,
    },
    bank_in: {
        type: "number",
        required: true,
    },
    bank_out: {
        type: "number",
        required: true,
    },
    description: {
        type: "string",
        required: false,
    },
    first_level_classify: {
        type: "enum",
        required: true,
        values: [
            'manage_cost', 'business_cost', 'finance_cost', 'bonus', 'cost_receivable', 'cost_payable', 'other_cost_receivable', 'cost_allot', 'cost_real_in', 'short_borrow_cost', 'other_cost_in', 'accrual_in', 'bonus_payable', 'other_cost_payable', 'other_cost_out'
        ]
    },
    second_level_detail: {
        type: "enum",
        required: true,
        values: [
            'work_cost', 'tel_cost', 'salary_cost', 'social_security_cost', 'rent_cost', 'packing_cost', 'royalty_cost', 'cash', 'middle_cost', 'accrual_cost', 'service_cost', 'all_profit_cost', 'accrual_in_cost', 'bonus', 'th_cost', 'freight_cost', 'cash_pledge', 'last_not_pay', 'not_allot_profit', 'other'
        ],
    },
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

    // 创建银行账
    async createBankReport() {
        const { ctx } = this;
        const params = ctx.helper.filterParams(
            createBankReportRules,
            Object.assign({}, ctx.request.body)
        );
        ctx.validate(createBankReportRules, params);
        const res = await this.bankReportService.createBankReport(params);
        ctx.body = res;
    }
}

module.exports = BankReportController;
