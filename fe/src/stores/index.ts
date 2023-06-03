import { computed, ref } from 'vue'
import { createPinia, defineStore } from 'pinia'
import axios from '@/api/axios'
import lodash from 'lodash'
import type { UserRes } from '@/api/res/user'

const pinia = createPinia()

export default pinia

export const useStore = defineStore('store', () => {
  const user = ref<{} | UserRes>({})

  const isLogin = computed(() => !lodash.isEmpty(user.value))

  const getUser = async () => {
    try {
      const res = await axios.get('/user/info')
      setUser(res.data)
    } catch {
      setUser({})
    }
  }

  const setUser = async (value: any) => {
    user.value = value || {}
  }

  return { user, isLogin, getUser, setUser }
})
