<script setup lang="ts">
import { message, type FormInstance } from 'ant-design-vue'
import axios from '@/api/axios'
import { defineEmits, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/stores'
import type { Rule } from 'ant-design-vue/lib/form'

const { t } = useI18n()

const store = useStore()

const emit = defineEmits(['closeModal'])

const formRef = ref<FormInstance>()

const formState = reactive<{
  phone_number: string
  password: string
  confirm_password: string
}>({
  phone_number: '',
  password: '',
  confirm_password: ''
})

onMounted(async () => {
  await store.getUser()
  const { phone_number } = store.user
  Object.assign(formState, {
    phone_number
  })
})

const validatePassword = async (_rule: Rule, value: string) => {
  if (formState.password !== '' && value !== formState.password) {
    return Promise.reject(t('updateUserModal.message.confirmPasswordInvalid'))
  } else {
    return Promise.resolve()
  }
}

const handleOk = async () => {
  try {
    // 校验表单
    await formRef.value!.validateFields()

    // 编辑用户
    try {
      const { username, account, role, is_modified_password } = store.user
      const { phone_number, password } = formState
      await axios.put(`/user/${store.user.id}`, {
        username,
        account,
        role,
        phone_number: phone_number || '',
        password: password || ''
      })
      message.success(t('updateUserModal.message.updateUserSuccess'))
      await store.getUser()
      if (!is_modified_password && store.user.is_modified_password) {
        window.location.reload()
      } else {
        close()
      }
    } catch (error: any) {
      switch (error?.response?.data?.message) {
        case '无权限': {
          message.error(t('common.message.noAuth'))
          break
        }
        default: {
          message.error(t('updateUserModal.message.updateUserFailed'))
        }
      }
    }
  } catch (error) {}
}

const handleCancel = () => {
  close()
}

const close = () => {
  if (store.user.is_modified_password) {
    emit('closeModal')
  } else {
    message.error(t('common.message.noModifiedPassword'))
  }
}
</script>

<template>
  <a-modal
    class="update-user-modal"
    :visible="true"
    :title="`${$t('updateUserModal.info.updateUser')}${
      store.user.is_modified_password ? '' : `(${$t('common.message.noModifiedPassword')})`
    }`"
    :maskClosable="store.user.is_modified_password"
    :cancelText="$t('common.actions.cancel')"
    :okText="$t('common.actions.confirm')"
    @ok="() => handleOk()"
    @cancel="() => handleCancel()"
  >
    <p class="user-info">
      <span class="username">{{ store.user.username }}</span>
      <span class="account">({{ store.user.account }})</span>
    </p>
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="{ offset: 1, span: 5 }"
      :wrapper-col="{ offset: 1, span: 16 }"
    >
      <!-- 电话号码 -->
      <a-form-item
        :label="$t('commonBiz.user.phoneNumber')"
        name="phone_number"
        :rules="[
          { required: true, message: $t('upsertUserModal.message.phoneNumberInvalid') },
          {
            pattern: /^[\d\-+]{7,20}$/,
            message: $t('upsertUserModal.message.phoneNumberPatternInvalid')
          }
        ]"
      >
        <a-input
          v-model:value="formState.phone_number"
          :placeholder="$t('updateUserModal.info.phoneNumberPlaceholder')"
        />
      </a-form-item>

      <!-- 密码 -->
      <a-form-item
        :label="$t('commonBiz.user.password')"
        name="password"
        :rules="[
          {
            required: !store.user.is_modified_password,
            message: $t('updateUserModal.message.passwordInvalid')
          },
          {
            pattern: /^[a-zA-Z0-9]{8,20}$/,
            message: $t('updateUserModal.message.passwordPatternInvalid')
          }
        ]"
      >
        <a-input-password
          v-model:value="formState.password"
          :placeholder="$t('updateUserModal.info.passwordPlaceholder')"
        />
      </a-form-item>

      <!-- 确认密码 -->
      <a-form-item
        v-if="formState.password !== ''"
        :label="$t('commonBiz.user.confirmPassword')"
        name="confirm_password"
        :rules="[
          {
            validator: validatePassword,
            trigger: 'change'
          }
        ]"
      >
        <a-input-password
          v-model:value="formState.confirm_password"
          :placeholder="$t('updateUserModal.info.confirmPasswordPlaceholder')"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less">
@import '@/assets/css/variables.less';

.update-user-modal {
  width: 640px;
  .user-info {
    margin-bottom: 24px;
    text-align: center;
  }
  .username {
    font-size: 18px;
  }
  .account {
    margin-left: 4px;
    color: @--text-color-secondary;
  }
}
</style>
