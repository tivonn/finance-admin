<script setup lang="ts">
import { getLocalStorage, setLocalStorage } from '@/utils/common'
import { ref } from 'vue'

const getLocalLanguage = () => {
  return getLocalStorage('language') || 'zh-cn'
}

const setLocalLanguage = () => {
  if (language.value !== getLocalLanguage()) {
    setLocalStorage('language', language.value)
    window.location.reload()
  }
}

const language = ref<string>(getLocalLanguage())
</script>

<template>
  <div class="language">
    <a-radio-group v-model:value="language" @change="setLocalLanguage">
      <a-radio-button value="zh-cn">中文</a-radio-button>
      <a-radio-button value="th">th</a-radio-button>
    </a-radio-group>
  </div>
</template>

<style lang="less">
@import '@/assets/css/variables.less';
</style>
