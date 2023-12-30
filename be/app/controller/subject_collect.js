"use strict";

const { Controller } = require("egg");

const getSubjectCollectsRules = {
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
    month: {
        type: "date",
        required: true
    },
    bank_report_date: {
        type: "string",
        required: false
    },
    subject_collect_project: {
        type: "array",
        itemType: "enum",
        rule: {
            type: "enum",
            required: false,
            values: [
                'manage_cost',
                'business_cost',
                'finance_cost',
                'bonus',    // 特例
                'cost_receivable',
                'cost_payable',
                'other_cost_receivable',
                'cost_allot',
                'cost_real_in',
                'short_borrow_cost',
                'other_cost_in',
                'accrual_in',
                'bonus_payable',
                'other_cost_payable',
                'other_cost_out'
            ]
        },
        required: false
    }
};

class SubjectCollectController extends Controller {
    get subjectCollectService() {
        return this.ctx.service.subjectCollect;
    }

    // 获取科目汇总列表
    async getSubjectCollects() {
        const { ctx } = this;
        const params = ctx.helper.filterParams(
            getSubjectCollectsRules,
            Object.assign({}, ctx.request.body)
        );
        ctx.validate(getSubjectCollectsRules, params);
        const res = await this.subjectCollectService.getSubjectCollects(params);
        ctx.body = res;
    }
}

module.exports = SubjectCollectController;
