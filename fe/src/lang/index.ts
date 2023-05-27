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
        account: '账号',
        accountPlaceholder: '请输入账号',
        password: '密码',
        passwordPlaceholder: '请输入密码',
        inputInValidMessage: '请输入账号密码',
        login: '登录'
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
