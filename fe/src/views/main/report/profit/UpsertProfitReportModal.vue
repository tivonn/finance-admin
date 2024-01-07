<script setup lang="ts">
import { message, type FormInstance } from 'ant-design-vue'
import axios from '@/api/axios'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import lodash from 'lodash'
import dayjs, { Dayjs } from 'dayjs'

const { t } = useI18n()

const props = defineProps({
  upsertProfitReport: Object,
  currentYear: Number
})
const emit = defineEmits(['closeModal'])

const formRef = ref<FormInstance>()

const formState = reactive<{
  year: number | null
  month: number | null
  project: string | null
}>({
  year: props.currentYear?.value || dayjs().year(),
  month: null,
  project: null
})

const months = [
  {
    text: t('upsertProfitReportModal.info.january'),
    value: 0
  },
  {
    text: t('upsertProfitReportModal.info.february'),
    value: 1
  },
  {
    text: t('upsertProfitReportModal.info.march'),
    value: 2
  },
  {
    text: t('upsertProfitReportModal.info.april'),
    value: 3
  },
  {
    text: t('upsertProfitReportModal.info.may'),
    value: 4
  },
  {
    text: t('upsertProfitReportModal.info.june'),
    value: 5
  },
  {
    text: t('upsertProfitReportModal.info.july'),
    value: 6
  },
  {
    text: t('upsertProfitReportModal.info.august'),
    value: 7
  },
  {
    text: t('upsertProfitReportModal.info.september'),
    value: 8
  },
  {
    text: t('upsertProfitReportModal.info.october'),
    value: 9
  },
  {
    text: t('upsertProfitReportModal.info.november'),
    value: 10
  },
  {
    text: t('upsertProfitReportModal.info.december'),
    value: 11
  }
]

const projects = [
  {
    text: t('upsertProfitReportModal.info.append'),
    value: 'append'
  },
  {
    text: t('upsertProfitReportModal.info.business_besides_in'),
    value: 'business_besides_in'
  },
  {
    text: t('upsertProfitReportModal.info.business_besides_out'),
    value: 'business_besides_out'
  },
  {
    text: t('upsertProfitReportModal.info.income'),
    value: 'income'
  }
]

const handleOk = async () => {
  try {
    // 校验表单
    await formRef.value!.validateFields()
    // 提交数据
    try {
      await axios.post('/profit/report', formState)
      message.success(t('upsertProfitReportModal.message.updateProfitReportSuccess'))
      close()
      window.location.reload()
    } catch (error: any) {
      switch (error?.response?.data?.message) {
        case '无权限': {
          message.error(t('common.message.noAuth'))
          break
        }
        default: {
          message.error(t('upsertProfitReportModal.message.updateProfitReportFailed'))
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
    class="upsert-profitReport-modal"
    :visible="true"
    :title="$t('upsertProfitReportModal.info.updateProfitReport')"
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
      <!-- 年份 -->
      <a-form-item :label="$t('upsertProfitReportModal.info.year')" name="year">
        <span>{{ dayjs(currentYear).year() }}年</span>
      </a-form-item>
      <!-- 月份 -->
      <a-form-item
        :label="$t('upsertProfitReportModal.info.month')"
        name="month"
        :rules="[
          {
            required: true,
            message: $t('upsertProfitReportModal.message.monthInvalid')
          }
        ]"
      >
        <a-select
          v-model:value="formState.month"
          :placeholder="$t('upsertProfitReportModal.info.monthPlaceholder')"
        >
          <a-select-option v-for="month in months" :key="month.value" :value="month.value">{{
            month.text
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <!-- 项目 -->
      <a-form-item
        :label="$t('upsertProfitReportModal.info.project')"
        name="project"
        :rules="[
          {
            required: true,
            message: $t('upsertProfitReportModal.message.projectInvalid')
          }
        ]"
      >
        <a-select
          v-model:value="formState.project"
          :placeholder="$t('upsertProfitReportModal.info.projectPlaceholder')"
        >
          <a-select-option
            v-for="project in projects"
            :key="project.value"
            :value="project.value"
            >{{ project.text }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <!-- 金额 -->
      <a-form-item
        :label="$t('upsertProfitReportModal.info.money')"
        name="money"
        :rules="[
          {
            required: true,
            type: 'number',
            message: $t('upsertProfitReportModal.info.moneyInvalid')
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.money"
          :controls="false"
          :placeholder="$t('upsertProfitReportModal.info.moneyPlaceholder')"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less">
.upsert-profitReport-modal {
  width: 640px;
}
</style>
