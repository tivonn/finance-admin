"use strict";

const Service = require("egg").Service;
const lodash = require("lodash");
const dayjs = require("dayjs");
const { getFirstLevelClassify, getSecondLevelDetail } = require('../utils/bank_report')

class BankReportService extends Service {
    get bankReportsModel() {
        return this.app.model.BankReports;
    }

    async getBankReports(params) {
        const { ctx, app } = this;
        // 权限校验
        const safeRoles = ["admin", "finance"];
        if (!safeRoles.includes(ctx.state.user.role)) {
            ctx.throw(403, "无权限");
        }
        // 业务逻辑
        // 查询数据
        const { Op } = app.Sequelize;
        const bankReports = await this.bankReportsModel.findAndCountAll({
            where: Object.assign(
                {},
                { pay_currency: params.pay_currency },
                {
                    is_delete: false,
                },
            ),
            ...ctx.helper.getPageParams(params.page_index, params.page_size),
            // 过滤返回数据
            attributes: {
                exclude: ["is_delete", "create_at", "update_at"].concat(params.pay_currency === 'CNY' ? ['exchange_rate', 'rmb_in', 'rmb_out', 'rmb_remain'] : []),
            },
        });
        bankReports.rows.forEach(bankReport => {
            bankReport.first_level_classify = getFirstLevelClassify(bankReport.first_level_classify)
            bankReport.second_level_detail = getSecondLevelDetail(bankReport.second_level_detail)
        })
        return bankReports;
    }
}

module.exports = BankReportService;
