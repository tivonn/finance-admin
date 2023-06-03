<script setup lang="ts">
import { ref } from 'vue'
import { Button as aButton, message } from 'ant-design-vue'
import axios from '@/api/axios'
import lodash from 'lodash'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/stores'
import Language from '@/components/Language.vue'

const router = useRouter()
const { t } = useI18n()
const store = useStore()

const loginForm = ref<{ account: string; password: string }>({
  account: '',
  password: ''
})

const login = async () => {
  // 校验表单
  if (lodash.isEmpty(loginForm.value.account) || lodash.isEmpty(loginForm.value.password)) {
    message.error(t('loginView.message.formInValid'))
    return
  }

  try {
    await axios.post('/user/login', {
      account: loginForm.value.account,
      password: loginForm.value.password
    })
    try {
      // 设置用户信息
      await store.getUser()

      // 登录成功，跳转主页面
      router.push({ name: 'overview' })
    } catch {}
  } catch (error: any) {
    switch (error?.response?.data?.message) {
      case '账号密码错误': {
        message.error(t('loginView.message.formInValid'))
        break
      }
      default: {
      }
    }
  }
}
</script>

<template>
  <div class="login-view">
    <Language class="language"></Language>
    <div class="login-container">
      <div class="login-background"></div>
      <div class="login-input">
        <div class="login-input-container">
          <p class="account-title">{{ $t('commonBiz.user.account') }}</p>
          <a-input
            v-model:value="loginForm.account"
            :bordered="false"
            :placeholder="$t('loginView.info.accountPlaceholder')"
            class="account-input"
            @pressEnter="login"
          />
          <p class="password-title">{{ $t('commonBiz.user.password') }}</p>
          <a-input-password
            v-model:value="loginForm.password"
            :bordered="false"
            :placeholder="$t('loginView.info.passwordPlaceholder')"
            class="password-input"
            @pressEnter="login"
          />
          <div class="login-button-container">
            <a-button type="primary" class="login-button" @click="login">{{
              $t('loginView.actions.login')
            }}</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '@/assets/css/variables.less';

.login-view {
  width: 100%;
  min-width: 960px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b4e2fc;
  .language {
    position: fixed;
    top: 16px;
    right: 16px;
  }
  .login-container {
    width: 960px;
    height: 720px;
    display: flex;
    background-color: #fff;
    border-radius: 16px;
    overflow: hidden;
  }
  .login-background {
    width: 360px;
    height: 100%;
    background-image: url(./assets/images/login-background.jpg);
    background-size: 100% 100%;
  }
  .login-input {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-input-container {
    width: 400px;
  }
  .account-title,
  .password-title {
    font-size: 12px;
    color: @--color-info;
  }
  .account-input,
  .password-input {
    border-bottom: 1px solid @--border-color-base;
    &:hover {
      border-color: @--color-success;
    }
  }
  .password-title {
    margin-top: 32px;
  }
  .login-button-container {
    margin-top: 48px;
    display: flex;
    justify-content: center;
  }
  .login-button {
    width: 200px;
    border-radius: 16px;
  }
}
</style>
