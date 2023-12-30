// 分类一级
const getFirstLevelClassify = (firstLevelClassify) => {
    const enums = { 'manage_cost': '管理费用', 'business_cost': '营业费用', 'finance_cost': '财务费用', 'bonus': '分红', 'cost_receivable': '应收账款', 'cost_payable': '应付账款', 'other_cost_receivable': '其他应收款', 'cost_allot': '利润分配', 'cost_real_in': '实收资本', 'short_borrow_cost': '短期借款', 'other_cost_in': '其他业务收入', 'accrual_in': '利息收入', 'bonus_payable': '应付分红', 'other_cost_payable': '其他应付款', 'other_cost_out': '其他业务支出' }
    return enums[firstLevelClassify]
}
exports.getFirstLevelClassify = getFirstLevelClassify

// 二级明细
const getSecondLevelDetail = (secondLevelDetail) => {
    const enums = { 'work_cost': '办公费', 'tel_cost': '电信费', 'salary_cost': '工资', 'social_security_cost': '社保费', 'rent_cost': '租金', 'packing_cost': '打包材料', 'royalty_cost': '提成', 'cash': '现金', 'middle_cost': '中间费', 'accrual_cost': '利息', 'service_cost': '手续费', 'all_profit_cost': '汇兑损益', 'accrual_in_cost': '利息收入', 'bonus': '分红', 'th_cost': '泰铢', 'freight_cost': '运费', 'cash_pledge': '押金', 'last_not_pay': '上家未付款', 'not_allot_profit': '未分配利润', 'other': '其他' }
    return enums[secondLevelDetail]
}

exports.getSecondLevelDetail = getSecondLevelDetail

// 银行账项目（分类一级 + 二级明细）
const getBankReportProject = (firstLevelClassify, secondLevelDetail) => {
    return `${getFirstLevelClassify(firstLevelClassify)}${getSecondLevelDetail(secondLevelDetail)}`
}
exports.getBankReportProject = getBankReportProject

// 科目汇总项目（分类一级映射）
const getSubjectCollectProject = (firstLevelClassify) => {
    const enums = {
        'manage_cost': '管理费用',
        'business_cost': '营业费用',
        'finance_cost': '财务费用',
        'bonus': '投资收益',    // 特例
        'cost_receivable': '应收账款',
        'cost_payable': '应付账款',
        'other_cost_receivable': '其他应收款',
        'cost_allot': '利润分配',
        'cost_real_in': '实收资本',
        'short_borrow_cost': '短期借款',
        'other_cost_in': '其他业务收入',
        'accrual_in': '利息收入',
        'bonus_payable': '应付分红',
        'other_cost_payable': '其他应付款',
        'other_cost_out': '其他业务支出'
    }
    return enums[firstLevelClassify]
}
exports.getSubjectCollectProject = getSubjectCollectProject