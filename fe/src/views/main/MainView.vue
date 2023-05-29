<script setup lang="ts">
import axios from '@/api/axios'
import { onMounted, ref } from 'vue'

const init = ref<string>('')

// onMounted(async () => {

// })

const test = async () => {
  const res = await axios.get('/user/init')
  init.value = res.data
}
</script>

<template>
  <main><a-button @click="test">test</a-button>main {{ init }}</main>
</template>
