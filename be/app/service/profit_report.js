"use strict";

const Service = require("egg").Service;
const lodash = require("lodash");
const dayjs = require("dayjs");
const math = require('mathjs')
const { exchangeRate } = require('../data/common')
const { calculateMoney } = require('../extend/helper')

const getTotalMonthMoney = (list, datekey, month, moneyKey) => {
    let sum = 0
    list.forEach(item => {
        if (dayjs(item[datekey]).month() === month) {
            const itemMoney = item.pay_currency === 'CNY' ? item[moneyKey] : calculateMoney((item[moneyKey] / exchangeRate))
            sum = calculateMoney(sum + itemMoney)
        }
    })
    return sum
}

class ProfitReportService extends Service {
    // get profitReportsModel() {
    //     return this.app.model.ProfitReports;
    // }

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

        // 一、主营业务收入
        // const mainBizIns = 
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
        const isLanguageCN = params.language === 'zh-cn'
        const profitReports = {
            count: null,
            rows: [
                {
                    id: 1,
                    project: isLanguageCN ? '一、主营业务收入' : '1.รายได้จากหลักธุรกิจ',
                    january: getTotalMonthMoney(orders, 'payed_date', 0, 'client_freight'),
                    february: getTotalMonthMoney(orders, 'payed_date', 1, 'client_freight'),
                    march: getTotalMonthMoney(orders, 'payed_date', 2, 'client_freight'),
                    april: getTotalMonthMoney(orders, 'payed_date', 3, 'client_freight'),
                    may: getTotalMonthMoney(orders, 'payed_date', 4, 'client_freight'),
                    june: getTotalMonthMoney(orders, 'payed_date', 5, 'client_freight'),
                    july: getTotalMonthMoney(orders, 'payed_date', 6, 'client_freight'),
                    august: getTotalMonthMoney(orders, 'payed_date', 7, 'client_freight'),
                    september: getTotalMonthMoney(orders, 'payed_date', 8, 'client_freight'),
                    october: getTotalMonthMoney(orders, 'payed_date', 9, 'client_freight'),
                    november: getTotalMonthMoney(orders, 'payed_date', 10, 'client_freight'),
                    december: getTotalMonthMoney(orders, 'payed_date', 11, 'client_freight'),
                    total: '合计金额'
                },
                {
                    id: 2,
                    project: isLanguageCN ? '减、主营业务成本' : 'ลดลง、ต้นทุนหลักธุรกิจ',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                },
                {
                    id: 3,
                    project: isLanguageCN ? '减：附加' : 'ลดลง、เพิ่มเติม',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                },
                {
                    id: 4,
                    project: isLanguageCN ? '二、营业利润' : '2. ผลกำไรจากการดำเนินธุรกิจ',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                },
                {
                    id: 5,
                    project: isLanguageCN ? '减、营业费用' : 'ลดลง、ค่าใช้จ่ายการดำเนินธุรกิจ',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                },
                {
                    id: 6,
                    project: isLanguageCN ? '减、管理费用' : 'ลดลง、ค่าใช้จ่ายบริหารงาน',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                },
                {
                    id: 7,
                    project: isLanguageCN ? '减、财务费用' : 'ลดลง、ค่าใช้จ่ายทางการเงิน',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                },
                {
                    id: 8,
                    project: isLanguageCN ? '三、营业利润总额' : '3. รวมผลกำไรจากการดำเนินธุรกิจ',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                },
                {
                    id: 9,
                    project: isLanguageCN ? '加：其他业务利润' : 'บวก：ผลกำไรจากธุรกิจอื่น ๆ',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                },
                {
                    id: 10,
                    project: isLanguageCN ? '加：投资收益' : 'บวก：ผลกำไรจากการลงทุน',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                },
                {
                    id: 11,
                    project: isLanguageCN ? '营业外收入' : 'รายได้นอกการดำเนินธุรกิจ',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                },
                {
                    id: 12,
                    project: isLanguageCN ? '减：营业外支出' : 'ลดลง: การใช้จ่ายนอกการดำเนินธุรกิจ',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                },
                {
                    id: 13,
                    project: isLanguageCN ? '四、利润总额' : '4. รวมผลกำไร',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                },
                {
                    id: 13,
                    project: isLanguageCN ? '四、利润总额' : '4. รวมผลกำไร',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                },
                {
                    id: 14,
                    project: isLanguageCN ? '减：所得税' : 'ลดลง: ภาษีผลกำไร',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                },
                {
                    id: 15,
                    project: isLanguageCN ? '五、净利润' : '5. ผลกำไรสุทธิ',
                    january: '1月',
                    february: '2月',
                    march: '3月',
                    april: '4月',
                    may: '5月',
                    june: '6月',
                    july: '7月',
                    august: '8月',
                    september: '9月',
                    october: '10月',
                    november: '11月',
                    december: '12月',
                    total: '合计金额'
                }
            ]
        }
        return profitReports;
    }
}

module.exports = ProfitReportService;
