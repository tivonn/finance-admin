// 分类一级
const getFirstLevelClassify = (firstLevelClassify) => {
    const enums = { 'manage_cost': '管理费用', 'business_cost': '营业费用', 'finance_cost': '财务费用', 'bonus': '分红', 'cost_receivable': '应收账款', 'cost_payable': '应付账款', 'other_cost_receivable': '其他应收款', 'cost_allot': '利润分配', 'cost_real_in': '实收资本', 'short_borrow_cost': '短期借款', 'bank_save_cost': '银行存款', 'other_cost_in': '其他业务收入' }
    return enums[firstLevelClassify]
}
exports.getFirstLevelClassify = getFirstLevelClassify

// 二级明细
const getSecondLevelDetail = (secondLevelDetail) => {
    const enums = { 'work_cost': '办公费', 'tel_cost': '电信费', 'salary_cost': '工资', 'social_security_cost': '社保费', 'rent_cost': '租金', 'packing_cost': '打包材料', 'royalty_cost': '提成', 'cash': '现金', 'middle_cost': '中间费', 'accrual_cost': '利息', 'service_cost': '手续费', 'all_profit_cost': '汇兑损益', 'accrual_in_cost': '利息收入', 'bonus': '分红', 'th_cost': '泰铢', 'freight_cost': '运费' }
    return enums[secondLevelDetail]
}

exports.getSecondLevelDetail = getSecondLevelDetail

// 项目（分类一级 + 二级明细）
const getProject = (firstLevelClassify, secondLevelDetail) => {
    return `${getFirstLevelClassify(firstLevelClassify)} - ${getSecondLevelDetail(secondLevelDetail)}`
}
exports.getProject = getProject