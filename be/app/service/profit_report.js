"use strict";

const Service = require("egg").Service;
const lodash = require("lodash");
const dayjs = require("dayjs");
const math = require('math.js')

class ProfitReportService extends Service {
    // get profitReportsModel() {
    //     return this.app.model.ProfitReports;
    // }

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
        const isLanguageCN = params.language === 'zh-cn'
        const profitReports = {
            count: null,
            rows: [
                {
                    id: 1,
                    project: isLanguageCN ? '一、主营业务收入' : '1.รายได้จากหลักธุรกิจ',
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
