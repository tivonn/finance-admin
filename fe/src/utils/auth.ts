interface Auth {
  [key: string]: {
    required: boolean
    allows?: Array<string>
  }
}

const allRoles = ['admin', 'finance', 'staff', 'external']

export const auth: Auth = {
  // 结构铺平，便于取值

  // 登录页
  login: { required: false },
  // 主页面
  main: { required: true, allows: allRoles },
  // 总览
  overview: { required: true, allows: allRoles },
  // 订单
  order: { required: true, allows: allRoles },
  // 财务报表
  report: { required: true, allows: allRoles },
  // 管理
  manage: { required: true, allows: ['admin'] },
  // 员工管理
  userManage: { required: true, allows: ['admin'] }
}
