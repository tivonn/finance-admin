<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const isLogin = false

  router.replace({
    name: isLogin ? 'main' : 'login'
  })
})
</script>

<template>
  <RouterView />
</template>

<style lang="less"></style>
