import axios from 'axios'
import { message } from 'ant-design-vue'
import { isDev } from '@/utils/common'

axios.defaults.baseURL = isDev() ? '' : ''

axios.interceptors.response.use(
  (res) => {
    return Promise.resolve(res)
  },
  (err) => {
    message.error('系统错误')
    return Promise.reject(err)
  }
)

export default axios
