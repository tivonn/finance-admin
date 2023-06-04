import './assets/css/main.less'

import { createApp } from 'vue'
import pinia, { useStore } from '@/stores'
import router from '@/router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/assets/css/antd.less'
import i18n from '@/utils/language'

import App from './App.vue'

const init = async () => {
  const app = createApp(App)

  const store = useStore()
  await store.getUser()

  app.use(pinia)
  app.use(router)
  app.use(Antd)
  app.use(i18n)

  app.mount('#app')
}

init()
