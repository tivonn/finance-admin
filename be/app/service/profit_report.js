"use strict";

const Service = require("egg").Service;
const lodash = require("lodash");
const dayjs = require("dayjs");
const math = require('mathjs')
const { exchangeRate } = require('../data/common')
const { calculateMoney } = require('../extend/helper')

class ProfitReportService extends Service {
    get profitReportsModel() {
        return this.app.model.ProfitReports;
    }

    get ordersModel() {
        return this.app.model.Orders;
    }

    async getProfitReports(params) {
        const { ctx, app } = this;
        // 权限校验
        const safeRoles = ["admin", "finance"];
        if (!safeRoles.includes(ctx.state.user.role)) {
            ctx.throw(403, "无权限");
        }
        // 业务逻辑
        // 查询数据
        const { Op } = app.Sequelize;

        const currentYear = dayjs(params.year).year()

        // 订单表
        // 一、主营业务收入
        const originOrders = await this.ordersModel.findAll({
            where: Object.assign(
                {},
                {
                    is_delete: false,
                    status: "cost_has_payed"
                },
            ),
        });
        const orders = originOrders.filter(order => dayjs(order.payed_date).year() === currentYear)
        const getOrderTotalMonthMoney = (list, datekey, currentMonth, moneyKey) => {
            let sum = 0
            list.forEach(item => {
                if (dayjs(item[datekey]).month() === currentMonth) {
                    const itemMoney = item.pay_currency === 'CNY' ? item[moneyKey] : calculateMoney((item[moneyKey] / exchangeRate))
                    sum = calculateMoney(sum + itemMoney)
                }
            })
            return sum
        }
        const getOrderTotalYearMoney = (list, moneyKey) => {
            let sum = 0
            list.forEach(item => {
                const itemMoney = item.pay_currency === 'CNY' ? item[moneyKey] : calculateMoney((item[moneyKey] / exchangeRate))
                sum = calculateMoney(sum + itemMoney)
            })
            return sum
        }
        const mainBizIn = (month) => {
            return getOrderTotalMonthMoney(orders, 'payed_date', month, 'client_freight')
        }
        const mainBizInYear = () => {
            return getOrderTotalYearMoney(orders, 'client_freight')
        }
        // 减、主营业务成本
        const mainBizOut = (month) => {
            return getOrderTotalMonthMoney(orders, 'payed_date', month, 'warehouse_freight')
        }
        const mainBizOutYear = () => {
            return getOrderTotalYearMoney(orders, 'warehouse_freight')
        }
        // 附加
        const originProfits = await this.profitReportsModel.findAll()
        const profits = originProfits.filter(profit => profit.year === currentYear)
        const getPeopleInTotalMonthMoney = (list, datekey, currentMonth, moneyKey, projectKey) => {
            let sum = 0
            list.forEach(item => {
                if (item[datekey] === currentMonth && item.project === projectKey) {
                    const itemMoney = item[moneyKey]
                    sum = calculateMoney(sum + itemMoney)
                }
            })
            return sum
        }
        const getPeopleInTotalYearMoney = (list, moneyKey, projectKey) => {
            let sum = 0
            list.forEach(item => {
                if (item.project === projectKey) {
                    const itemMoney = item[moneyKey]
                    sum = calculateMoney(sum + itemMoney)
                }
            })
            return sum
        }
        const append = (month) => {
            return getPeopleInTotalMonthMoney(profits, 'month', month, 'money', 'append')
        }
        const appendYear = () => {
            return getPeopleInTotalYearMoney(profits, 'money', 'append')
        }
        // 二、营业利润
        const businessIn = (month) => {
            return mainBizIn(month) - mainBizOut(month) - append(month)
        }
        const businessInYear = () => {
            return mainBizInYear() - mainBizOutYear() - appendYear()
        }
        // 营业费用
        const businessOut = async (month) => {
            return await getSubjectCollectsMoney(true, month, '营业费用')
        }
        const businessOutYear = async () => {
            return ctx.helper.calculateMoney(
                (await businessOut(0)) +
                (await businessOut(1)) +
                (await businessOut(2)) +
                (await businessOut(3)) +
                (await businessOut(4)) +
                (await businessOut(5)) +
                (await businessOut(6)) +
                (await businessOut(7)) +
                (await businessOut(8)) +
                (await businessOut(9)) +
                (await businessOut(10)) +
                (await businessOut(11))
            )
        }
        // 管理费用
        const manageOut = async (month) => {
            return await getSubjectCollectsMoney(true, month, '管理费用')
        }
        const manageOutYear = async () => {
            return ctx.helper.calculateMoney(await manageOut(0) +
                (await manageOut(1)) +
                (await manageOut(2)) +
                (await manageOut(3)) +
                (await manageOut(4)) +
                (await manageOut(5)) +
                (await manageOut(6)) +
                (await manageOut(7)) +
                (await manageOut(8)) +
                (await manageOut(9)) +
                (await manageOut(10)) +
                (await manageOut(11))
            )
        }
        // 财务费用
        const financeOut = async (month) => {
            return ctx.helper.calculateMoney((await getSubjectCollectsMoney(true, month, '财务费用')) - (await getSubjectCollectsMoney(false, month, '财务费用')))
        }
        const financeOutYear = async () => {
            return ctx.helper.calculateMoney(
                (await financeOut(0)) +
                (await financeOut(1)) +
                (await financeOut(2)) +
                (await financeOut(3)) +
                (await financeOut(4)) +
                (await financeOut(5)) +
                (await financeOut(6)) +
                (await financeOut(7)) +
                (await financeOut(8)) +
                (await financeOut(9)) +
                (await financeOut(10)) +
                (await financeOut(11))
            )
        }
        // 三、营业利润总额
        const businessInTotal = async (month) => {
            return businessIn(month) - (await businessOut(month)) - (await manageOut(month)) - (await financeOut(month))
        }
        const businessInTotalYear = async () => {
            return businessInYear() - (await businessOutYear()) - (await manageOutYear()) - (await financeOutYear())
        }
        // 其它业务利润
        const otherBizIn = async (month) => {
            return (await getSubjectCollectsMoney(false, month, '其他业务收入')) - (await getSubjectCollectsMoney(true, month, '其他业务收入'))
        }
        const otherBizInYear = async () => {
            return ctx.helper.calculateMoney(
                (await otherBizIn(0)) +
                (await otherBizIn(1)) +
                (await otherBizIn(2)) +
                (await otherBizIn(3)) +
                (await otherBizIn(4)) +
                (await otherBizIn(5)) +
                (await otherBizIn(6)) +
                (await otherBizIn(7)) +
                (await otherBizIn(8)) +
                (await otherBizIn(9)) +
                (await otherBizIn(10)) +
                (await otherBizIn(11))
            )
        }
        // 投资收益
        const investIn = async (month) => {
            return await getSubjectCollectsMoney(false, month, '投资收益')
        }
        const investInYear = async () => {
            return ctx.helper.calculateMoney(
                (await investIn(0)) +
                (await investIn(1)) +
                (await investIn(2)) +
                (await investIn(3)) +
                (await investIn(4)) +
                (await investIn(5)) +
                (await investIn(6)) +
                (await investIn(7)) +
                (await investIn(8)) +
                (await investIn(9)) +
                (await investIn(10)) +
                (await investIn(11))
            )
        }
        // 营业外收入
        const businessBesidesIn = (month) => {
            return getPeopleInTotalMonthMoney(profits, 'month', month, 'money', 'business_besides_in')
        }
        const businessBesidesInYear = () => {
            return getPeopleInTotalYearMoney(profits, 'money', 'business_besides_in')
        }
        // 营业外支出
        const businessBesidesOut = (month) => {
            return getPeopleInTotalMonthMoney(profits, 'month', month, 'money', 'business_besides_out')
        }
        const businessBesidesOutYear = () => {
            return getPeopleInTotalYearMoney(profits, 'money', 'business_besides_out')
        }
        // 四、利润总额
        const inTotal = async (month) => {
            return (await businessInTotal(month)) + (await otherBizIn(month)) + (await investIn(month)) + (await businessBesidesIn(month)) - (await businessBesidesOut(month))
        }
        const inTotalYear = async () => {
            return (await businessInTotalYear()) + (await otherBizInYear()) + (await investInYear()) + (await businessBesidesInYear()) - (await businessBesidesOutYear())
        }
        // 所得税
        const income = (month) => {
            return getPeopleInTotalMonthMoney(profits, 'month', month, 'money', 'income')
        }
        const incomeYear = () => {
            return getPeopleInTotalYearMoney(profits, 'money', 'income')
        }
        // 净利润
        const remainIn = async (month) => {
            return (await inTotal(month)) - income(month)
        }
        const remainInYear = async () => {
            return (await inTotalYear()) - incomeYear()
        }

        // 科目汇总表
        const getSubjectCollectsMoney = async (isOut, month, project) => {
            // 当月的科目汇总表数据
            const subjectCollectsCNY = (await this.ctx.service.subjectCollect.getSubjectCollects({
                page_index: 1,
                page_size: 65536,
                pay_currency: 'CNY',
                month: dayjs().year(currentYear).month(month).format()
            })).rows
            const subjectCollectsTHB = (await this.ctx.service.subjectCollect.getSubjectCollects({
                page_index: 1,
                page_size: 65536,
                pay_currency: 'THB',
                month: dayjs().year(currentYear).month(month).format()
            })).rows
            // 计算当月金额            
            let totalMonthMoney = 0
            subjectCollectsCNY.forEach(item => {
                if (item.subject_collect_project === project) {
                    totalMonthMoney = ctx.helper.calculateMoney(totalMonthMoney + isOut ? item.out_price : item.in_price)
                }
            })
            subjectCollectsTHB.forEach(item => {
                if (item.subject_collect_project === project) {
                    totalMonthMoney = ctx.helper.calculateMoney(totalMonthMoney + isOut ? item.out_price : item.in_price)
                }
            })
            return totalMonthMoney
        }

        // 汇总利润表
        const isLanguageCN = params.language === 'zh-cn'
        const profitReports = {
            count: null,
            rows: [
                {
                    id: 1,
                    project: isLanguageCN ? '一、主营业务收入' : '1.รายได้จากหลักธุรกิจ',
                    january: mainBizIn(0),
                    february: mainBizIn(1),
                    march: mainBizIn(2),
                    april: mainBizIn(3),
                    may: mainBizIn(4),
                    june: mainBizIn(5),
                    july: mainBizIn(6),
                    august: mainBizIn(7),
                    september: mainBizIn(8),
                    october: mainBizIn(9),
                    november: mainBizIn(10),
                    december: mainBizIn(11),
                    total: mainBizInYear()
                },
                {
                    id: 2,
                    project: isLanguageCN ? '减、主营业务成本' : 'ลดลง、ต้นทุนหลักธุรกิจ',
                    january: mainBizOut(0),
                    february: mainBizOut(1),
                    march: mainBizOut(2),
                    april: mainBizOut(3),
                    may: mainBizOut(4),
                    june: mainBizOut(5),
                    july: mainBizOut(6),
                    august: mainBizOut(7),
                    september: mainBizOut(8),
                    october: mainBizOut(9),
                    november: mainBizOut(10),
                    december: mainBizOut(11),
                    total: mainBizOutYear()
                },
                {
                    id: 3,
                    project: isLanguageCN ? '减：附加' : 'ลดลง、เพิ่มเติม',
                    january: append(0),
                    february: append(1),
                    march: append(2),
                    april: append(3),
                    may: append(4),
                    june: append(5),
                    july: append(6),
                    august: append(7),
                    september: append(8),
                    october: append(9),
                    november: append(10),
                    december: append(11),
                    total: appendYear()
                },
                {
                    id: 4,
                    project: isLanguageCN ? '二、营业利润' : '2. ผลกำไรจากการดำเนินธุรกิจ',
                    january: businessIn(0),
                    february: businessIn(1),
                    march: businessIn(2),
                    april: businessIn(3),
                    may: businessIn(4),
                    june: businessIn(5),
                    july: businessIn(6),
                    august: businessIn(7),
                    september: businessIn(8),
                    october: businessIn(9),
                    november: businessIn(10),
                    december: businessIn(11),
                    total: businessInYear()
                },
                {
                    id: 5,
                    project: isLanguageCN ? '减、营业费用' : 'ลดลง、ค่าใช้จ่ายการดำเนินธุรกิจ',
                    january: await businessOut(0),
                    february: await businessOut(1),
                    march: await businessOut(2),
                    april: await businessOut(3),
                    may: await businessOut(4),
                    june: await businessOut(5),
                    july: await businessOut(6),
                    august: await businessOut(7),
                    september: await businessOut(8),
                    october: await businessOut(9),
                    november: await businessOut(10),
                    december: await businessOut(11),
                    total: await businessOutYear()
                },
                {
                    id: 6,
                    project: isLanguageCN ? '减、管理费用' : 'ลดลง、ค่าใช้จ่ายบริหารงาน',
                    january: await manageOut(0),
                    february: await manageOut(1),
                    march: await manageOut(2),
                    april: await manageOut(3),
                    may: await manageOut(4),
                    june: await manageOut(5),
                    july: await manageOut(6),
                    august: await manageOut(7),
                    september: await manageOut(8),
                    october: await manageOut(9),
                    november: await manageOut(10),
                    december: await manageOut(11),
                    total: await manageOutYear()
                },
                {
                    id: 7,
                    project: isLanguageCN ? '减、财务费用' : 'ลดลง、ค่าใช้จ่ายทางการเงิน',
                    january: await financeOut(0),
                    february: await financeOut(1),
                    march: await financeOut(2),
                    april: await financeOut(3),
                    may: await financeOut(4),
                    june: await financeOut(5),
                    july: await financeOut(6),
                    august: await financeOut(7),
                    september: await financeOut(8),
                    october: await financeOut(9),
                    november: await financeOut(10),
                    december: await financeOut(11),
                    total: await financeOutYear()
                },
                {
                    id: 8,
                    project: isLanguageCN ? '三、营业利润总额' : '3. รวมผลกำไรจากการดำเนินธุรกิจ',
                    january: await businessInTotal(0),
                    february: await businessInTotal(1),
                    march: await businessInTotal(2),
                    april: await businessInTotal(3),
                    may: await businessInTotal(4),
                    june: await businessInTotal(5),
                    july: await businessInTotal(6),
                    august: await businessInTotal(7),
                    september: await businessInTotal(8),
                    october: await businessInTotal(9),
                    november: await businessInTotal(10),
                    december: await businessInTotal(11),
                    total: await businessInTotalYear()
                },
                {
                    id: 9,
                    project: isLanguageCN ? '加：其他业务利润' : 'บวก：ผลกำไรจากธุรกิจอื่น ๆ',
                    january: await otherBizIn(0),
                    february: await otherBizIn(1),
                    march: await otherBizIn(2),
                    april: await otherBizIn(3),
                    may: await otherBizIn(4),
                    june: await otherBizIn(5),
                    july: await otherBizIn(6),
                    august: await otherBizIn(7),
                    september: await otherBizIn(8),
                    october: await otherBizIn(9),
                    november: await otherBizIn(10),
                    december: await otherBizIn(11),
                    total: await otherBizInYear()
                },
                {
                    id: 10,
                    project: isLanguageCN ? '加：投资收益' : 'บวก：ผลกำไรจากการลงทุน',
                    january: await investIn(0),
                    february: await investIn(1),
                    march: await investIn(2),
                    april: await investIn(3),
                    may: await investIn(4),
                    june: await investIn(5),
                    july: await investIn(6),
                    august: await investIn(7),
                    september: await investIn(8),
                    october: await investIn(9),
                    november: await investIn(10),
                    december: await investIn(11),
                    total: await investInYear()
                },
                {
                    id: 11,
                    project: isLanguageCN ? '营业外收入' : 'รายได้นอกการดำเนินธุรกิจ',
                    january: await businessBesidesIn(0),
                    february: await businessBesidesIn(1),
                    march: await businessBesidesIn(2),
                    april: await businessBesidesIn(3),
                    may: await businessBesidesIn(4),
                    june: await businessBesidesIn(5),
                    july: await businessBesidesIn(6),
                    august: await businessBesidesIn(7),
                    september: await businessBesidesIn(8),
                    october: await businessBesidesIn(9),
                    november: await businessBesidesIn(10),
                    december: await businessBesidesIn(11),
                    total: await businessBesidesInYear()
                },
                {
                    id: 12,
                    project: isLanguageCN ? '减：营业外支出' : 'ลดลง: การใช้จ่ายนอกการดำเนินธุรกิจ',
                    january: await businessBesidesOut(0),
                    february: await businessBesidesOut(1),
                    march: await businessBesidesOut(2),
                    april: await businessBesidesOut(3),
                    may: await businessBesidesOut(4),
                    june: await businessBesidesOut(5),
                    july: await businessBesidesOut(6),
                    august: await businessBesidesOut(7),
                    september: await businessBesidesOut(8),
                    october: await businessBesidesOut(9),
                    november: await businessBesidesOut(10),
                    december: await businessBesidesOut(11),
                    total: await businessBesidesOutYear()
                },
                {
                    id: 13,
                    project: isLanguageCN ? '四、利润总额' : '4. รวมผลกำไร',
                    january: await inTotal(0),
                    february: await inTotal(1),
                    march: await inTotal(2),
                    april: await inTotal(3),
                    may: await inTotal(4),
                    june: await inTotal(5),
                    july: await inTotal(6),
                    august: await inTotal(7),
                    september: await inTotal(8),
                    october: await inTotal(9),
                    november: await inTotal(10),
                    december: await inTotal(11),
                    total: await inTotalYear()
                },
                {
                    id: 14,
                    project: isLanguageCN ? '减：所得税' : 'ลดลง: ภาษีผลกำไร',
                    january: await income(0),
                    february: await income(1),
                    march: await income(2),
                    april: await income(3),
                    may: await income(4),
                    june: await income(5),
                    july: await income(6),
                    august: await income(7),
                    september: await income(8),
                    october: await income(9),
                    november: await income(10),
                    december: await income(11),
                    total: await incomeYear()
                },
                {
                    id: 15,
                    project: isLanguageCN ? '五、净利润' : '5. ผลกำไรสุทธิ',
                    january: await remainIn(0),
                    february: await remainIn(1),
                    march: await remainIn(2),
                    april: await remainIn(3),
                    may: await remainIn(4),
                    june: await remainIn(5),
                    july: await remainIn(6),
                    august: await remainIn(7),
                    september: await remainIn(8),
                    october: await remainIn(9),
                    november: await remainIn(10),
                    december: await remainIn(11),
                    total: await remainInYear()
                }
            ]
        }
        return profitReports;
    }

    async updateProfitReports(params) {
        const { ctx } = this;
        // 权限校验
        const safeRoles = ["admin", 'finance'];
        if (!safeRoles.includes(ctx.state.user.role)) {
            ctx.throw(403, "无权限");
        }
        // 业务逻辑
        // 编辑利润表
        const profitItem = await this.profitReportsModel.findOne({
            where: {
                year: params.year,
                month: params.month,
                project: params.project,
            }
        })
        if (profitItem) {
            const data = await profitItem.update({
                money: params.money
            })
            return data
        } else {
            const data = await this.profitReportsModel.create({
                year: params.year,
                month: params.month,
                project: params.project,
                money: params.money
            })
            return data
        }
    }
}

module.exports = ProfitReportService;
