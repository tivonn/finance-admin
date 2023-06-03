<script setup lang="ts">
import { message, type FormInstance } from 'ant-design-vue'
import axios from 'axios'
import lodash from 'lodash'
import { computed, defineEmits, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  userUpsertId: Number
})
const emit = defineEmits(['closeModal'])

const isCreate = computed(() => lodash.isEmpty(props.userUpsertId))

const formRef = ref<FormInstance>()
const formState = reactive<{
  username: string
  account: string
  role: string
}>({
  username: '',
  account: '',
  role: ''
})

const handleOk = async () => {
  // 校验表单
  try {
    const values = await formRef.value!.validateFields()

    // 提交数据
    if (isCreate) {
      let success = false
      try {
        await axios.post('/user', values)
        success = true
      } catch (error: any) {
        switch (error?.response?.data?.message) {
          case '无权限': {
            message.error(t('common.message.noAuth'))
            break
          }
          case '账号已存在': {
            message.error(t('userUpsertModal.message.accountIsExist'))
            break
          }
          default: {
          }
        }
      }
      if (success) {
        message.info(t('userUpsertModal.message.createUserSuccess'))
        close()
      }
    } else {
      try {
        await axios.post('/put', Object.assign({}, values, { user_id: props.userUpsertId }))
        close()
      } catch (error) {}
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
    :visible="true"
    :title="
      isCreate ? $t('userUpsertModal.info.createUser') : $t('userUpsertModal.info.updateUser')
    "
    :cancelText="$t('common.info.cancelModal')"
    :okText="$t('common.info.confirmModal')"
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
        :rules="[{ required: true, message: $t('userUpsertModal.message.usernameInvalid') }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <!-- 账号 -->
      <a-form-item
        :label="$t('commonBiz.user.account')"
        name="account"
        :rules="[{ required: true, message: $t('userUpsertModal.message.accountInvalid') }]"
      >
        <a-input v-model:value="formState.account" />
      </a-form-item>

      <!-- 角色 -->
      <a-form-item
        :label="$t('commonBiz.user.role')"
        name="role"
        :rules="[{ required: true, message: $t('userUpsertModal.message.roleInvalid') }]"
      >
        <a-radio-group v-model:value="formState.role">
          <a-radio-button value="admin">管理员</a-radio-button>
          <a-radio-button value="finance">财务</a-radio-button>
          <a-radio-button value="staff">内部员工</a-radio-button>
          <a-radio-button value="external">外部用户</a-radio-button>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less"></style>
