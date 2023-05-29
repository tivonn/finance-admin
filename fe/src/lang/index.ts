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
        login: '登录',
        account: '账号',
        accountPlaceholder: '请输入账号',
        password: '密码',
        passwordPlaceholder: '请输入密码',
        inputInValidMessage: '请输入账号密码',
        dataInValidMessage: '请输入正确的账号密码'
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
