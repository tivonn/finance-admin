"use strict";

const Service = require("egg").Service;
const lodash = require("lodash");
const dayjs = require("dayjs");
const { getFirstLevelClassify, getSecondLevelDetail, getSubjectCollectProject } = require('../utils/bank_report')
const math = require('mathjs')

class SubjectCollectService extends Service {
    get bankReportsModel() {
        return this.app.model.BankReports;
    }

    async getSubjectCollects(params) {
        const { ctx, app } = this;
        // 权限校验
        const safeRoles = ["admin", "finance"];
        if (!safeRoles.includes(ctx.state.user.role)) {
            ctx.throw(403, "无权限");
        }
        // 业务逻辑
        // 查询数据
        const { Op } = app.Sequelize;
        // 查询银行账
        const bankReports = await this.bankReportsModel.findAndCountAll({
            where: Object.assign(
                {},
                { pay_currency: params.pay_currency },
                {
                    is_delete: false,
                },
                params.subject_collect_project
                    ? {
                        first_level_classify: {
                            [Op.in]: params.subject_collect_project,
                        },
                    }
                    : {}
            ),
        });
        // 计算科目汇总

        // 根据日期筛选结果，处理银行账&科目汇总的字段转换。得到铺平的科目汇总
        const originSubjectCollects = bankReports.rows.map(bankReport => {
            return {
                bank_report_date: bankReport.bank_report_date,
                subject_collect_project: getSubjectCollectProject(bankReport.first_level_classify),
                accounting_subject: getFirstLevelClassify(bankReport.first_level_classify),
                detail: getSecondLevelDetail(bankReport.second_level_detail),
                in_price: params.pay_currency === 'CNY' ? bankReport.bank_in : bankReport.rmb_in,
                out_price: params.pay_currency === 'CNY' ? bankReport.bank_out : bankReport.rmb_out,
            }
        }).filter(bankReport => {
            return dayjs(bankReport.bank_report_date).format('YYYY-MM') === dayjs(params.month).format('YYYY-MM') &&   // 月份相等
                (params.bank_report_date ? bankReport.bank_report_date === params.bank_report_date : true)// 日期相等
        })
        // 根据 项目 聚类科目汇总
        const cache = {}
        let in_total = 0
        let out_total = 0
        originSubjectCollects.forEach(originSubjectCollect => {
            const key = `${originSubjectCollect.bank_report_date}${originSubjectCollect.accounting_subject}${originSubjectCollect.detail}`
            if (cache.hasOwnProperty(key)) {
                // 累加收款和支出
                cache[key].in_price += originSubjectCollect.in_price
                cache[key].out_price += originSubjectCollect.out_price
            } else {
                cache[key] = lodash.cloneDeep(originSubjectCollect)
            }
            in_total += originSubjectCollect.in_price
            out_total += originSubjectCollect.out_price
        })
        // 得到聚类后的结果
        const subjectCollects = Object.values(cache);
        // 根据页码拆分响应
        const resSubjectCollects = subjectCollects.slice((params.page_index - 1) * params.page_size, (params.page_index - 1) * params.page_size + params.page_size)

        return { count: subjectCollects.length, rows: resSubjectCollects, in_total: in_total, out_total: out_total };
    }
}

module.exports = SubjectCollectService;
