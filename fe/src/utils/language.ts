import { getLocalStorage } from '@/utils/common'
import { createI18n } from 'vue-i18n'

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: getLocalStorage('language'),
  fallbackLocale: 'zh-cn',
  messages: {
    'zh-cn': {
      common: {
        info: {},
        actions: {
          confirm: '确定',
          cancel: '取消',
          reset: '重置',
          updateUser: '编辑资料',
          logout: '退出登录'
        },
        message: {
          netError: '系统错误',
          noAuth: '无权限',
          logoutFailed: '退出登录失败',
          noModifiedPassword: '首次登录请修改密码'
        }
      },
      commonBiz: {
        user: {
          username: '用户名',
          account: '账号',
          password: '密码',
          confirmPassword: '确认密码',
          role: '角色',
          roles: {
            admin: '管理员',
            staff: '内部员工',
            finance: '财务',
            external: '外部用户'
          },
          phoneNumber: '电话号码'
        }
      },
      route: {
        overview: '总览',
        order: '订单详情',
        report: '财务报表',
        manage: '管理',
        manages: { manageUser: '用户管理' }
      },
      updateUserModal: {
        info: {
          updateUser: '编辑资料',
          phoneNumberPlaceholder: '请输入电话号码',
          passwordPlaceholder: '请输入新密码（仅需修改密码时填写）',
          confirmPasswordPlaceholder: '请重新输入新密码（仅需修改密码时填写）'
        },
        message: {
          passwordInvalid: '密码必填',
          passwordPatternInvalid: '密码要求由字母、数字组成，长度在8-20个字符',
          confirmPasswordInvalid: '两次密码输入需要一致',
          updateUserSuccess: '编辑资料成功',
          updateUserFailed: '编辑资料失败'
        }
      },
      loginView: {
        info: {
          accountPlaceholder: '请输入账号',
          passwordPlaceholder: '请输入密码'
        },
        actions: {
          login: '登录'
        },
        message: {
          formInValid: '请输入正确的账号密码',
          loginFailed: '登录失败'
        }
      },
      overviewView: {
        info: {
          empty: '总览页开发中'
        }
      },
      orderView: {
        info: {
          user_code: '用户代号',
          receive_goods_date: '收货日期',
          waybill_number: '运单号',
          goods_number: '货号',
          goods_name: '货物名称',
          transport_mode: '运输方式',
          count: '数量',
          number: '件数',
          description: '备注',
          weight: '重量/KG',
          inner_size_length: '内部尺寸/CM（长）',
          inner_size_width: '内部尺寸/CM（宽）',
          inner_size_height: '内部尺寸/CM（高）',
          volume: '体积/CBM',
          unit_price: '单价',
          packing_cost: '打包费',
          client_freight: '客户运费',
          stuffing_number: '装柜号',
          warehouse_size_length: '库房尺寸/CM（长）',
          warehouse_size_width: '库房尺寸/CM（宽）',
          warehouse_size_height: '库房尺寸/CM（高）',
          warehouse_volumn: '库房体积/CBM',
          cost_unit_price: '成本单价',
          cost_packing_cost: '成本打包费',
          warehouse_freight: '库房运费',
          status: '状态',
          client_cost_to_be_record: '客户费用待录入',
          warehouse_cost_to_be_record: '库房费用待录入',
          cost_to_be_pay: '待付款',
          cost_has_payed: '已付款',
          payed_date: '付款日期'
        },
        actions: {
          downloadTemplate: '下载模版',
          uploadExcel: '上传表格',
          downloadBills: '导出送货单',
          confirmDeleteOrder: '确定删除订单？'
        },
        message: {
          downloadTemplateFailed: '下载模板失败',
          uploadSuccess: '表格上传成功',
          excelInvalid: '表格不符合模板要求',
          uploadFailed: '表格上传失败',
          deleteOrderSuccess: '删除订单成功',
          deleteOrderFailed: '删除订单失败'
        }
      },
      reportView: {
        info: {
          empty: '财务报表页开发中'
        }
      },
      manageUserView: {
        info: {
          action: '操作'
        },
        actions: {
          addUser: '新增用户',
          search: '搜索',
          reset: '重置',
          confirmDeleteUser: '确定删除用户？'
        },
        message: {
          deleteUserSuccess: '删除用户成功',
          deleteUserFailed: '删除用户失败'
        }
      },
      upsertUserModal: {
        info: {
          createUser: '创建用户',
          updateUser: '编辑用户',
          usernamePlaceholder: '请输入用户名',
          accountPlaceholder: '请输入账号',
          phoneNumberPlaceholder: '请输入电话号码'
        },
        message: {
          usernameInvalid: '用户名必填',
          accountInvalid: '账号必填',
          accountPatternInvalid: '账号要求由字母、数字、下划线组成，长度在6-20个字符',
          roleInvalid: '角色必填',
          phoneNumberInvalid: '电话号码必填',
          phoneNumberPatternInvalid: '请输入正确的电话号码',
          accountIsExist: '账号已存在',
          createUserSuccess: '创建用户成功',
          createUserFailed: '创建用户失败',
          updateUserSuccess: '编辑用户成功',
          updateUserFailed: '编辑用户失败',
          userNotFount: '不存在该用户',
          accountCanNotUpdate: '账号不可修改'
        }
      }
    },
    th: {
      common: {
        info: {},
        action: {
          confirm: 'ยืนยัน',
          cancel: 'ยกเลิก',
          reset: 'รีเซ็ต',
          logout: 'ออกจากระบบ'
        },
        message: {
          netError: 'ข้อผิดพลาดของระบบ',
          noAuth: 'ไม่มีสิทธิ์',
          logoutFailed: 'ออกจากระบบไม่สำเร็จ'
        }
      },
      commonBiz: {
        user: {
          username: 'ชื่อผู้ใช้',
          account: 'บัญชี',
          password: 'รหัสผ่าน',
          role: 'บทบาท',
          roles: {
            admin: 'ผู้ดูแลระบบ',
            staff: 'พนักงานภายใน',
            finance: 'การเงิน',
            external: 'ผู้ใช้ภายนอก'
          }
        }
      },
      route: {
        overview: 'ภาพรวม',
        order: 'รายละเอียดการสั่งซื้อ',
        report: 'รายงานการเงิน',
        manage: 'การจัดการ',
        manages: { manageUser: 'การจัดการผู้ใช้' }
      },
      loginView: {
        info: {
          accountPlaceholder: 'กรุณาใส่บัญชีผู้ใช้',
          passwordPlaceholder: 'กรุณาใส่รหัสผ่าน'
        },
        actions: {
          login: 'เข้าสู่ระบบ'
        },
        message: {
          formInValid: 'กรุณาใส่บัญชีผู้ใช้และรหัสผ่านที่ถูกต้อง',
          loginFailed: 'เข้าสู่ระบบไม่สำเร็จ'
        }
      },
      overviewView: {
        info: {
          empty: 'หน้าภาพรวมกำลังพัฒนา'
        }
      },
      orderView: {
        info: {
          empty: 'หน้ารายละเอียดการสั่งซื้อกำลังพัฒนา'
        }
      },
      reportView: {
        info: {
          empty: 'หน้ารายงานการเงินกำลังพัฒนา'
        }
      },
      manageUserView: {
        info: {
          action: 'ดำเนินการ'
        },
        actions: {
          addUser: 'เพิ่มผู้ใช้',
          search: 'ค้นหา',
          reset: 'รีเซ็ต',
          confirmDeleteUser: 'คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้?'
        },
        message: {
          deleteUserSuccess: 'ลบผู้ใช้สำเร็จ',
          deleteUserFailed: 'ลบผู้ใช้ไม่สำเร็จ'
        }
      },
      upsertUserModal: {
        info: {
          createUser: 'สร้างผู้ใช้',
          updateUser: 'แก้ไขผู้ใช้'
        },
        message: {
          usernameInvalid: 'กรุณาใส่ชื่อผู้ใช้',
          accountInvalid: 'กรุณาใส่บัญชี',
          roleInvalid: 'กรุณาเลือกบทบาท',
          accountIsExist: 'บัญชีนี้มีอยู่แล้ว',
          createUserSuccess: 'สร้างผู้ใช้สำเร็จ',
          createUserFailed: 'สร้างผู้ใช้ไม่สำเร็จ',
          updateUserSuccess: 'แก้ไขผู้ใช้สำเร็จ',
          updateUserFailed: 'แก้ไขผู้ใช้ไม่สำเร็จ',
          userNotFount: 'ไม่พบผู้ใช้',
          accountCanNotUpdate: 'ไม่สามารถแก้ไขบัญชีได้'
        }
      }
    }
  }
})
