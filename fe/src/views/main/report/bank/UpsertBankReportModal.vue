<script setup lang="ts">
import { message, type FormInstance } from 'ant-design-vue'
import axios from '@/api/axios'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import lodash from 'lodash'

const { t } = useI18n()

const props = defineProps({
  upsertBankReport: Object,
  currentPayCurrency: String,
  firstLevelClassifyFilters: Array<Object>,
  secondLevelDetailFilters: Array<Object>
})
const emit = defineEmits(['closeModal'])

const isCreate = computed(() => lodash.isNull(props.upsertBankReport))

const formRef = ref<FormInstance>()

const formState = reactive<{
  id?: number
  pay_currency: string
  bank_report_date: string
  bank_in: number | null
  bank_out: number | null
  description: string
  first_level_classify: any
  second_level_detail: any
}>(
  isCreate.value
    ? {
        pay_currency: props.currentPayCurrency,
        bank_report_date: '',
        bank_in: null,
        bank_out: null,
        description: '',
        first_level_classify: null,
        second_level_detail: null
      }
    : { ...props.upsertBankReport }
)

const handleOk = async () => {
  try {
    // 校验表单
    await formRef.value!.validateFields()
    // 提交数据
    if (isCreate.value) {
      // 创建银行账
      try {
        await axios.post('/bank/report', formState)
        message.success(t('upsertBankReportModal.message.createBankReportSuccess'))
        close()
        window.location.reload()
      } catch (error: any) {
        switch (error?.response?.data?.message) {
          case '无权限': {
            message.error(t('common.message.noAuth'))
            break
          }
          default: {
            message.error(t('upsertBankReportModal.message.createBankReportFailed'))
          }
        }
      }
    } else {
      // 编辑银行账
      // try {
      //   await axios.put(`/bankReport/${formState.id}`, formState)
      //   message.success(t('upsertBankReportModal.message.updateBankReportSuccess'))
      //   close()
      //   window.location.reload()
      // } catch (error: any) {
      //   switch (error?.response?.data?.message) {
      //     case '无权限': {
      //       message.error(t('common.message.noAuth'))
      //       break
      //     }
      //     case '账号不可修改': {
      //       message.error(t('upsertBankReportModal.message.accountCanNotUpdate'))
      //       break
      //     }
      //     default: {
      //       message.error(t('upsertBankReportModal.message.updateBankReportFailed'))
      //     }
      //   }
      // }
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
    class="upsert-bankReport-modal"
    :visible="true"
    :title="
      isCreate
        ? $t('upsertBankReportModal.info.createBankReport')
        : $t('upsertBankReportModal.info.updateBankReport')
    "
    :cancelText="$t('common.actions.cancel')"
    :okText="$t('common.actions.confirm')"
    @ok="() => handleOk()"
    @cancel="() => handleCancel()"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="{ offset: 1, span: 5 }"
      :wrapper-col="{ offset: 1, span: 16 }"
    >
      <!-- 付款日期 -->
      <a-form-item
        :label="$t('bankReportView.info.bankReportDate')"
        name="bank_report_date"
        :rules="[
          {
            required: true,
            type: 'date',
            message: $t('upsertBankReportModal.message.bankReportDateInvalid')
          }
        ]"
      >
        <a-date-picker
          v-model:value="formState.bank_report_date"
          :placeholder="$t('upsertBankReportModal.info.bankReportDatePlaceholder')"
          style="width: 100%"
        />
      </a-form-item>

      <!-- 银行进账 -->
      <a-form-item
        :label="$t('bankReportView.info.bankIn')"
        name="bank_in"
        :rules="[
          {
            required: true,
            type: 'number',
            message: $t('upsertBankReportModal.message.bankInInvalid')
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.bank_in"
          :controls="false"
          :placeholder="$t('upsertBankReportModal.info.bankInPlaceholder')"
          style="width: 100%"
        />
      </a-form-item>

      <!-- 银行支出 -->
      <a-form-item
        :label="$t('bankReportView.info.bankOut')"
        name="bank_out"
        :rules="[
          {
            required: true,
            type: 'number',
            message: $t('upsertBankReportModal.message.bankOutInvalid')
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.bank_out"
          :controls="false"
          :placeholder="$t('upsertBankReportModal.info.bankOutPlaceholder')"
          style="width: 100%"
        />
      </a-form-item>

      <!-- 备注 -->
      <a-form-item
        :label="$t('bankReportView.info.description')"
        name="description"
        :rules="[
          {
            required: false
          }
        ]"
      >
        <a-input
          v-model:value="formState.description"
          :placeholder="$t('upsertBankReportModal.info.descriptionPlaceholder')"
        />
      </a-form-item>

      <!-- 分类一级 -->
      <a-form-item
        :label="$t('bankReportView.info.firstLevelClassify')"
        name="first_level_classify"
        :rules="[
          {
            required: true,
            message: $t('upsertBankReportModal.message.firstLevelClassifyInvalid')
          }
        ]"
      >
        <a-select
          v-model:value="formState.first_level_classify"
          :placeholder="$t('upsertBankReportModal.info.firstLevelClassifyPlaceholder')"
        >
          <a-select-option
            v-for="firstLevelClassifyFilter in firstLevelClassifyFilters"
            :key="firstLevelClassifyFilter.value"
            :value="firstLevelClassifyFilter.value"
            >{{ firstLevelClassifyFilter.text }}</a-select-option
          >
        </a-select>
      </a-form-item>

      <!-- 二级明细 -->
      <a-form-item
        :label="$t('bankReportView.info.secondLevelDetail')"
        name="second_level_detail"
        :rules="[
          {
            required: true,
            message: $t('upsertBankReportModal.message.secondLevelDetailInvalid')
          }
        ]"
      >
        <a-select
          v-model:value="formState.second_level_detail"
          :placeholder="$t('upsertBankReportModal.info.secondLevelDetailPlaceholder')"
        >
          <a-select-option
            v-for="secondLevelDetailFilter in secondLevelDetailFilters"
            :key="secondLevelDetailFilter.value"
            :value="secondLevelDetailFilter.value"
            >{{ secondLevelDetailFilter.text }}</a-select-option
          >
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less">
.upsert-bankReport-modal {
  width: 640px;
}
</style>
