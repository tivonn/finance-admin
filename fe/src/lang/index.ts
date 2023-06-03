import { getLocalStorage } from '@/utils/common'
import { createI18n } from 'vue-i18n'

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: getLocalStorage('language'),
  fallbackLocale: 'zh-cn',
  messages: {
    'zh-cn': {
      loginView: {
        info: {
          account: '账号',
          accountPlaceholder: '请输入账号',
          password: '密码',
          passwordPlaceholder: '请输入密码'
        },
        actions: {
          login: '登录'
        },
        message: {
          inputInValid: '请输入正确的账号密码'
        }
      },
      userManageView: {
        info: {
          username: '用户名',
          account: '账号',
          role: '权限',
          roles: {
            admin: '管理员',
            staff: '内部员工',
            finance: '财务',
            external: '外部用户'
          },
          action: '操作'
        },
        actions: {
          addUser: '新增用户',
          search: '搜索',
          reset: '重置',
          confirmDeleteUser: '确定删除用户？'
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
