<script setup lang="ts">
import { ref } from 'vue'
import { Button as aButton, message } from 'ant-design-vue'
import axios from '@/api/axios'
import lodash from 'lodash'
import Language from '@/components/Language.vue'
import { useI18n } from 'vue-i18n'

const account = ref<string>('')
const password = ref<string>('')
const { t } = useI18n()

const login = async () => {
  if (lodash.isEmpty(account.value) || lodash.isEmpty(password.value)) {
    message.error(t('loginView.inputInValidMessage'))
    return
  }

  const res = await axios.post('/user/login', {
    account: account.value,
    password: password.value
  })
  console.log(res)
}
</script>

<template>
  <div class="login-view">
    <Language class="language"></Language>
    <div class="login-container">
      <div class="login-background"></div>
      <div class="login-input">
        <div class="login-input-container">
          <p class="account-title">{{ $t('loginView.account') }}</p>
          <a-input
            v-model:value="account"
            :bordered="false"
            :placeholder="$t('loginView.accountPlaceholder')"
            class="account-input"
          />
          <p class="password-title">{{ $t('loginView.password') }}</p>
          <a-input-password
            v-model:value="password"
            :bordered="false"
            :placeholder="$t('loginView.passwordPlaceholder')"
            class="password-input"
          />
          <div class="login-button-container">
            <a-button type="primary" class="login-button" @click="login">{{
              $t('loginView.login')
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
