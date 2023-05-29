<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import axios from './api/axios'

const router = useRouter()

onMounted(async () => {
  const user = await axios.get('/user/info')
  const isLogin = !!Object.keys(user.data).length
  router.replace({
    name: isLogin ? 'main' : 'login'
  })
})
</script>

<template>
  <RouterView />
</template>

<style lang="less"></style>
