<script setup lang="ts">
import { message, type FormInstance } from 'ant-design-vue'
import axios from '@/api/axios'
import { computed, defineEmits, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import lodash from 'lodash'
import type { UserRes } from '@/api/res/user'

const { t } = useI18n()

const props = defineProps({
  upsertUser: Object
})
const emit = defineEmits(['closeModal'])

const isCreate = computed(() => lodash.isEmpty(props.upsertUser))

const formRef = ref<FormInstance>()

const formState = reactive<{
  id?: number
  username: string
  account: string
  role: string
  phone_number: string
}>(
  isCreate.value
    ? {
        username: '',
        account: '',
        role: '',
        phone_number: ''
      }
    : { ...(props.upsertUser as UserRes) }
)

const handleOk = async () => {
  try {
    // 校验表单
    await formRef.value!.validateFields()
    // 提交数据
    if (isCreate.value) {
      // 创建用户
      try {
        await axios.post('/user', formState)
        message.success(t('upsertUserModal.message.createUserSuccess'))
        close()
        window.location.reload()
      } catch (error: any) {
        switch (error?.response?.data?.message) {
          case '无权限': {
            message.error(t('common.message.noAuth'))
            break
          }
          case '账号已存在': {
            message.error(t('upsertUserModal.message.accountIsExist'))
            break
          }
          default: {
            message.error(t('upsertUserModal.message.createUserFailed'))
          }
        }
      }
    } else {
      // 编辑用户
      try {
        await axios.put(`/user/${formState.id}`, formState)
        message.success(t('upsertUserModal.message.updateUserSuccess'))
        close()
        window.location.reload()
      } catch (error: any) {
        switch (error?.response?.data?.message) {
          case '无权限': {
            message.error(t('common.message.noAuth'))
            break
          }
          case '账号不可修改': {
            message.error(t('upsertUserModal.message.accountCanNotUpdate'))
            break
          }
          default: {
            message.error(t('upsertUserModal.message.updateUserFailed'))
          }
        }
      }
    }
  } catch (error) {}
}

const handleCancel = () => {
  close()
}

const close = () => {
  emit('closeModal')
}
</script>

<template>
  <a-modal
    class="upsert-user-modal"
    :visible="true"
    :title="
      isCreate ? $t('upsertUserModal.info.createUser') : $t('upsertUserModal.info.updateUser')
    "
    :cancelText="$t('common.action.cancel')"
    :okText="$t('common.action.confirm')"
    @ok="() => handleOk()"
    @cancel="() => handleCancel()"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="{ offset: 1, span: 5 }"
      :wrapper-col="{ offset: 1, span: 16 }"
    >
      <!-- 用户名 -->
      <a-form-item
        :label="$t('commonBiz.user.username')"
        name="username"
        :rules="[{ required: true, message: $t('upsertUserModal.message.usernameInvalid') }]"
      >
        <a-input
          v-model:value="formState.username"
          :placeholder="$t('upsertUserModal.info.usernamePlaceholder')"
        />
      </a-form-item>

      <!-- 账号 -->
      <a-form-item
        :label="$t('commonBiz.user.account')"
        name="account"
        :rules="[
          { required: true, message: $t('upsertUserModal.message.accountInvalid') },
          {
            pattern: /^[a-zA-Z0-9_]{6,20}$/,
            message: $t('upsertUserModal.message.accountPatternInvalid')
          }
        ]"
      >
        <a-input
          v-model:value="formState.account"
          :disabled="!isCreate"
          :placeholder="$t('upsertUserModal.info.accountPlaceholder')"
        />
      </a-form-item>

      <!-- 角色 -->
      <a-form-item
        :label="$t('commonBiz.user.role')"
        name="role"
        :rules="[{ required: true, message: $t('upsertUserModal.message.roleInvalid') }]"
      >
        <a-radio-group v-model:value="formState.role">
          <a-radio-button value="admin">{{ $t('commonBiz.user.roles.admin') }}</a-radio-button>
          <a-radio-button value="finance">{{ $t('commonBiz.user.roles.finance') }}</a-radio-button>
          <a-radio-button value="staff">{{ $t('commonBiz.user.roles.staff') }}</a-radio-button>
          <a-radio-button value="external">{{
            $t('commonBiz.user.roles.external')
          }}</a-radio-button>
        </a-radio-group>
      </a-form-item>

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
          :placeholder="$t('upsertUserModal.info.phoneNumberPlaceholder')"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less">
.upsert-user-modal {
  width: 640px;
}
</style>
