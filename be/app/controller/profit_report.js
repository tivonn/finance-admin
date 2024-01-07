"use strict";

const { Controller } = require("egg");

const getProfitReportsRules = {
    year: {
        type: "date",
        required: true
    },
    language: {
        type: "enum",
        required: true,
        values: [
            "zh-cn",
            "th",
        ]
    },
};

const updateProfitReportsRules = {
    year: {
        type: "number",
        required: true,
    },
    month: {
        type: "number",
        required: true,
    },
    money: {
        type: "number",
        required: true,
    },
    project: {
        type: "enum",
        required: true,
        values: [
            "append",
            "business_besides_in",
            "business_besides_out",
            "income",
        ],
    },
}

class ProfitReportController extends Controller {
    get profitReportService() {
        return this.ctx.service.profitReport;
    }

    // 获取利润表
    async getProfitReports() {
        const { ctx } = this;
        const params = ctx.helper.filterParams(
            getProfitReportsRules,
            Object.assign({}, ctx.request.body)
        );
        ctx.validate(getProfitReportsRules, params);
        const res = await this.profitReportService.getProfitReports(params);
        ctx.body = res;
    }

    // 更新利润表
    async updateProfitReports() {
        const { ctx } = this;
        const params = ctx.helper.filterParams(
            updateProfitReportsRules,
            Object.assign({}, ctx.params, ctx.request.body)
        );
        ctx.validate(updateProfitReportsRules, params);
        const res = await this.profitReportService.updateProfitReports(params);
        ctx.body = res;
    }
}

module.exports = ProfitReportController;
