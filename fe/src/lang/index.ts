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
        info: {
          confirmModal: '确认',
          cancelModal: '取消'
        },
        message: {
          netError: '系统错误',
          noAuth: '无权限'
        }
      },
      commonBiz: {
        user: {
          username: '用户名',
          account: '账号',
          password: '密码',
          role: '角色',
          roles: {
            admin: '管理员',
            staff: '内部员工',
            finance: '财务',
            external: '外部用户'
          }
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
          formInValid: '请输入正确的账号密码'
        }
      },
      userManageView: {
        info: {
          action: '操作'
        },
        actions: {
          addUser: '新增用户',
          search: '搜索',
          reset: '重置',
          confirmDeleteUser: '确定删除用户？'
        }
      },
      userUpsertModal: {
        info: {
          createUser: '创建用户',
          updateUser: '编辑用户'
        },
        message: {
          usernameInvalid: '用户名必填',
          accountInvalid: '账号必填',
          roleInvalid: '角色必填',
          accountIsExist: '账号已存在',
          createUserSuccess: '创建用户成功'
        }
      }
    },
    th: {
      loginView: {
        account: 'account',
        password: 'password'
      }
    }
  }
})
