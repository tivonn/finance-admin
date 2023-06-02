import axios from 'axios'
import { message } from 'ant-design-vue'
import { isDev } from '@/utils/common'

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
        window.location.href = '/login'
        break
      }
      case 500: {
        message.error('系统错误')
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
