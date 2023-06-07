import { computed, ref } from 'vue'
import { createPinia, defineStore } from 'pinia'
import axios from '@/api/axios'
import type { UserRes } from '@/api/res/user'

const pinia = createPinia()

export default pinia

export const useStore = defineStore('store', () => {
  const defaultUser: UserRes = {
    id: 0,
    username: '',
    account: '',
    role: '',
    phone_number: '',
    is_modified_password: false
  }

  const user = ref<UserRes>({ ...defaultUser })

  const isLogin = computed(() => user.value.id !== 0)

  const getUser = async () => {
    try {
      const res = await axios.get('/user/info')
      setUser(res.data)
    } catch {
      resetUser()
    }
  }

  const setUser = async (value: UserRes) => {
    user.value = value
  }

  const resetUser = () => {
    setUser({ ...defaultUser })
  }

  return { user, isLogin, getUser, setUser, resetUser }
})
