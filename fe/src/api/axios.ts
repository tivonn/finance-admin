import axios from 'axios'
import { message } from 'ant-design-vue'
import { useStore } from '@/stores'
import pinia from '@/stores'
import { isDev } from '@/utils/common'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

axios.defaults.baseURL = isDev()
  ? `${location.protocol}//${location.hostname}:7001/api`
  : 'http://43.139.233.254:7001/api'

axios.defaults.withCredentials = true

axios.interceptors.response.use(
  (res) => {
    return Promise.resolve(res)
  },
  (err) => {
    switch (err.response.status) {
      case 401: {
        // 清空用户信息缓存，主要用于停留在页面且 cookie 过期的情况
        const store = useStore(pinia)
        store.setUser({})
        // 跳转登录页
        const router = useRouter()
        router.push({ name: 'login' })
        break
      }
      case 500: {
        const { t } = useI18n()
        message.error(t('common.message.netError'))
        break
      }
      default: {
        break
      }
    }
    return Promise.reject(err)
  }
)

export default axios
