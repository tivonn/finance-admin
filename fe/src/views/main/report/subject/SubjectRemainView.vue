<script setup lang="ts">
import { usePagination } from 'vue-request'
import { computed, ref } from 'vue'
import axios from '@/api/axios'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import UpsertBankReportModal from '@/views/main/report/bank/UpsertBankReportModal.vue'
import { message } from 'ant-design-vue'
import { useStore } from '@/stores'
import { getLocalStorage, setLocalStorage } from '@/utils/common'
import dayjs, { Dayjs } from 'dayjs'

const { t } = useI18n()
const store = useStore()

// 获取表格数据 START
interface APIParams {
  page_index: number
  page_size: number
  sortField?: string
  sortOrder?: number
  [key: string]: any
}
interface APIResult {
  count: number
  rows: Array<{}>
}

const subjectCollectProjectFilters = [
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.manage_cost'),
    value: 'manage_cost'
  },
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.business_cost'),
    value: 'business_cost'
  },
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.finance_cost'),
    value: 'finance_cost'
  },
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.bonus'),
    value: 'bonus'
  },
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.cost_receivable'),
    value: 'cost_receivable'
  },
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.cost_payable'),
    value: 'cost_payable'
  },
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.other_cost_receivable'),
    value: 'other_cost_receivable'
  },
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.cost_allot'),
    value: 'cost_allot'
  },
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.cost_real_in'),
    value: 'cost_real_in'
  },
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.short_borrow_cost'),
    value: 'short_borrow_cost'
  },
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.other_cost_in'),
    value: 'other_cost_in'
  },
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.accrual_in'),
    value: 'accrual_in'
  },
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.bonus_payable'),
    value: 'bonus_payable'
  },
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.other_cost_payable'),
    value: 'other_cost_payable'
  },
  {
    text: t('subjectCollectView.info.subjectCollectProjectFilters.other_cost_out'),
    value: 'other_cost_out'
  }
]

// 自定义
const columns = [
  {
    dataIndex: 'bank_report_date',
    key: 'bank_report_date',
    title: t('subjectCollectView.info.bankReportDate'),
    customFilterDropdown: true
  },
  {
    dataIndex: 'subject_collect_project',
    key: 'subject_collect_project',
    title: t('subjectCollectView.info.subjectCollectProject'),
    filters: subjectCollectProjectFilters
  },
  {
    dataIndex: 'accounting_subject',
    key: 'accounting_subject',
    title: t('subjectCollectView.info.accountingSubject')
  },
  {
    dataIndex: 'detail',
    key: 'detail',
    title: t('subjectCollectView.info.detail')
  },
  {
    dataIndex: 'in_price',
    key: 'in_price',
    title: t('subjectCollectView.info.inPrice')
  },
  {
    dataIndex: 'out_price',
    key: 'out_price',
    title: t('subjectCollectView.info.outPrice')
  }
]

// 付款币种
const currentPayCurrency = ref<string>(getLocalStorage('bank-pay-currency') || 'CNY')
const selectBankReportPayCurrency = (payCurrency: string) => {
  currentPayCurrency.value = payCurrency
  setLocalStorage('bank-pay-currency', payCurrency)
  window.location.reload()
}

// 当前月份
const currentMonth = ref<Dayjs>(
  getLocalStorage('subject-collect-month')
    ? dayjs(getLocalStorage('subject-collect-month'))
    : dayjs()
)
const selectMonth = (month: Dayjs) => {
  currentMonth.value = month
  setLocalStorage('subject-collect-month', dayjs(month).format('YYYY-MM'))
  window.location.reload()
}

const queryData = (params: APIParams) => {
  // 自定义
  return axios.post<APIResult>('/subject/collect/get_list', {
    pay_currency: currentPayCurrency.value,
    month: currentMonth.value,
    ...params
  })
}

const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
  total
} = usePagination(queryData, {
  pagination: {
    currentKey: 'page_index',
    pageSizeKey: 'page_size',
    totalKey: 'data.count'
  }
})

const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
  showSizeChanger: true
}))

// 获取表格数据 END

// 操作表格
const handleTableChange: any = (
  pag: { pageSize: number; current: number },
  filters: any,
  sorter: any
) => {
  // 自定义
  const _filters = Object.assign(
    {},
    filters,
    filters.bank_report_date
      ? {
          bank_report_date: filters.bank_report_date[0]
        }
      : {}
  )
  run({
    page_index: pag.current,
    page_size: pag.pageSize,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ..._filters
  })
}

// 筛选
const handleSearch = (confirm: Function) => {
  confirm()
}

const handleReset = (clearFilters: Function) => {
  clearFilters({ confirm: true })
}

// 修改数据
const showUpsertBankReportModal = ref<boolean>(false)
const upsertBankReport = ref<{}>({})

// const canEditUser = (): boolean => {
//   const safeRoles = ['admin']
//   return safeRoles.includes(store.user.role)
// }
const toggleUpsertBankReportModal = (isShow: boolean) => {
  showUpsertBankReportModal.value = isShow
  if (!isShow) {
    upsertBankReport.value = {}
  }
}

const addBankReport = () => {
  upsertBankReport.value = {}
  toggleUpsertBankReportModal(true)
}

// const updateUser = (user) => {
//   upsertBankReport.value = user
//   toggleUpsertBankReportModal(true)
// }

const deleteBankReport = async (subjectCollect) => {
  // try {
  //   await axios.delete(`/user/${user.id}`)
  //   message.success(t('subjectCollectView.message.deleteUserSuccess'))
  //   window.location.reload()
  // } catch (error) {
  //   message.error(t('subjectCollectView.message.deleteUserFailed'))
  // }
}

const downloadBankReport = () => {}
const viewInBankReport = () => {}
const viewOutBankReport = () => {}
</script>

<template>
  <div class="subject-collect-view">
    <div class="subject-collect-header">
      <div style="display: flex">
        <div class="subject-collect-title">{{ $t('route.reports.subjectRemain') }}</div>
        <div class="subject-collect-type">
          <a-radio-group v-model:value="currentPayCurrency">
            <a-radio-button value="CNY" @click="selectBankReportPayCurrency('CNY')">{{
              $t('subjectCollectView.actions.selectCNYBankReport')
            }}</a-radio-button>
            <a-radio-button value="THB" @click="selectBankReportPayCurrency('THB')">{{
              $t('subjectCollectView.actions.selectTHBBankReport')
            }}</a-radio-button>
          </a-radio-group>

          <a-date-picker
            v-model:value="currentMonth"
            picker="month"
            :placeholder="$t('common.actions.monthSelectPlaceholder')"
            style="margin-left: 16px"
            :allowClear="false"
            @change="selectMonth"
          />
        </div>
      </div>

      <div class="subject-collect-action">
        <a-button type="primary" style="margin-left: 16px" @click="downloadBankReport" disabled>{{
          $t('subjectCollectView.actions.downloadBankReport')
        }}</a-button>
      </div>
    </div>
    <a-table
      :columns="columns"
      :row-key="(row) => row.id"
      :data-source="dataSource?.data.rows"
      :locale="{
        filterConfirm: $t('common.actions.confirm'),
        filterReset: $t('common.actions.reset')
      }"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- 表头 -->
      <!-- 重写筛选入口 -->
      <template #customFilterIcon="{ filtered }">
        <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
      <!-- 筛选框 -->
      <template
        #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
      >
        <div style="padding: 8px">
          <a-input
            :placeholder="`${$t('common.actions.search')}${column.title}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="(e: any) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(confirm)"
          />
          <a-button
            type="primary"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="() => handleSearch(confirm)"
          >
            <template #icon><search-outlined /></template>
            {{ $t('common.actions.search') }}
          </a-button>
          <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
            {{ $t('common.actions.reset') }}
          </a-button>
        </div>
      </template>
      <!-- 
      表格内容
      <template #bodyCell="{ record, column, text }">
        权限
        <template v-if="column.key === 'role'">
          <a-tag
            :key="text"
            :color="column.filters.find((role: any) => role.value === text)?.color"
          >
            {{ column.filters.find((role: any) => role.value === text)?.text }}
          </a-tag>
        </template>
        操作
        <template v-else-if="column.key === 'action'">
          <span class="action">
            <template v-if="canEditUser()">
              <edit-outlined class="edit-action" @click="() => updateUser(record)" />
              <a-divider type="vertical" />
              <a-popconfirm
                :title="$t('subjectCollectView.actions.confirmDeleteUser')"
                :ok-text="$t('common.actions.confirm')"
                :cancel-text="$t('common.actions.cancel')"
                @confirm="() => deleteBankReport(record)"
              >
                <delete-outlined class="delete-action" />
              </a-popconfirm>
            </template>
            <span v-else>-</span>
          </span>
        </template>
      </template>
      -->
      <template v-if="dataSource?.data.count" #summary>
        <a-table-summary-row>
          <a-table-summary-cell
            ><span style="font-weight: bold">{{
              $t('subjectCollectView.info.total')
            }}</span></a-table-summary-cell
          >
          <a-table-summary-cell> </a-table-summary-cell>
          <a-table-summary-cell> </a-table-summary-cell>
          <a-table-summary-cell> </a-table-summary-cell>
          <a-table-summary-cell>{{ dataSource?.data.in_total }}</a-table-summary-cell>
          <a-table-summary-cell>{{ dataSource?.data.out_total }}</a-table-summary-cell>
        </a-table-summary-row>
      </template>
    </a-table>
  </div>
  <!-- <UpsertBankReportModal
    v-if="showUpsertBankReportModal"
    :upsertBankReport="upsertBankReport"
    :currentPayCurrency="currentPayCurrency"
    :firstLevelClassifyFilters="firstLevelClassifyFilters"
    :secondLevelDetailFilters="secondLevelDetailFilters"
    @closeModal="() => toggleUpsertBankReportModal(false)"
  >
  </UpsertBankReportModal> -->
</template>

<style lang="less">
@import '@/assets/css/variables.less';

.subject-collect-view {
  .subject-collect-header {
    height: 60px;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }

  .subject-collect-title {
    line-height: 32px;
    font-size: 16px;
    font-weight: bold;
  }

  .subject-collect-type {
    margin-left: 16px;
  }

  .subject-collect-action {
    margin-left: auto;
    display: flex;
  }

  .action {
    .edit-action,
    .delete-action {
      &:hover {
        cursor: pointer;
      }
    }

    .edit-action {
      &:hover {
        color: @--color-success;
      }
    }

    .delete-action {
      &:hover {
        color: @--color-danger;
      }
    }
  }
}
</style>
