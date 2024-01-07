"use strict";

const Service = require("egg").Service;
const lodash = require("lodash");
const dayjs = require("dayjs");
const { getFirstLevelClassify, getSecondLevelDetail, getBankReportProject } = require('../utils/bank_report')
const { exchangeRate } = require('../data/common')

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
                params.first_level_classify
                    ? {
                        first_level_classify: {
                            [Op.in]: params.first_level_classify,
                        },
                    }
                    : {},
                params.second_level_detail
                    ? {
                        second_level_detail: {
                            [Op.in]: params.second_level_detail,
                        },
                    }
                    : {}
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

    // 获取要创建银行账的数据，可复用
    async getCreateBankReportData(params) {
        const { payCurrency, bankReportDate, bankIn, bankOut, description, firstLevelClassify, secondLevelDetail } = params
        // 取最新的一条银行账，找余额
        const bankReports = await this.bankReportsModel.findAll({ where: { pay_currency: payCurrency } })
        const originRemain = bankReports.length ? bankReports[bankReports.length - 1].remain : 0
        // 计算新的余额，新余额 = 旧余额 + 银行进账 - 银行支出
        const newRemain = ctx.helper.calculateMoney(ctx.helper.calculateMoney(originRemain + bankIn - bankOut))
        // 生成银行账数据
        const data = Object.assign({}, {
            bank_report_date: bankReportDate,
            bank_in: bankIn,
            bank_out: bankOut,
            remain: newRemain,
            description,
            first_level_classify: firstLevelClassify,
            second_level_detail: secondLevelDetail,
            project: getBankReportProject(firstLevelClassify, secondLevelDetail),
            pay_currency: payCurrency
        }, payCurrency === 'CNY' ? {} : {
            exchange_rate: exchangeRate,
            rmb_in: (bankIn / exchangeRate).toFixed(2),
            rmb_out: (bankOut / exchangeRate).toFixed(2),
            rmb_remain: (newRemain / exchangeRate).toFixed(2),
        })
        return data
    }

    async createBankReport(params) {
        const { ctx } = this;
        // 权限校验
        const safeRoles = ["admin", 'finance'];
        if (!safeRoles.includes(ctx.state.user.role)) {
            ctx.throw(403, "无权限");
        }
        // 业务逻辑
        // 创建银行账
        const data = await this.ctx.service.bankReport.getCreateBankReportData({
            payCurrency: params.pay_currency,
            bankReportDate: params.bank_report_date,
            bankIn: params.bank_in,
            bankOut: params.bank_out,
            description: params.description,
            firstLevelClassify: params.first_level_classify,
            secondLevelDetail: params.second_level_detail,
        })
        const bankReport = await this.bankReportsModel.create(data);
        return bankReport
    }
}

module.exports = BankReportService;
