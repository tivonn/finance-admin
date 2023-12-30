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
  counts: number
  rows: Array<{}>
}

const firstLevelClassifyFilters = [
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.manage_cost'),
    value: 'manage_cost'
  },
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.business_cost'),
    value: 'business_cost'
  },
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.finance_cost'),
    value: 'finance_cost'
  },
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.bonus'),
    value: 'bonus'
  },
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.cost_receivable'),
    value: 'cost_receivable'
  },
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.cost_payable'),
    value: 'cost_payable'
  },
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.other_cost_receivable'),
    value: 'other_cost_receivable'
  },
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.other_cost_payable'),
    value: 'other_cost_payable'
  },
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.cost_allot'),
    value: 'cost_allot'
  },
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.cost_real_in'),
    value: 'cost_real_in'
  },
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.short_borrow_cost'),
    value: 'short_borrow_cost'
  },
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.other_cost_in'),
    value: 'other_cost_in'
  },
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.other_cost_out'),
    value: 'other_cost_out'
  },
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.accrual_in'),
    value: 'accrual_in'
  },
  {
    text: t('bankReportView.info.firstLevelClassifyFilter.bonus_payable'),
    value: 'bonus_payable'
  }
]

const secondLevelDetailFilters = [
  {
    text: t('bankReportView.info.secondLevelDetailFilter.work_cost'),
    value: 'work_cost'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.tel_cost'),
    value: 'tel_cost'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.salary_cost'),
    value: 'salary_cost'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.social_security_cost'),
    value: 'social_security_cost'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.rent_cost'),
    value: 'rent_cost'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.packing_cost'),
    value: 'packing_cost'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.royalty_cost'),
    value: 'royalty_cost'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.cash'),
    value: 'cash'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.middle_cost'),
    value: 'middle_cost'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.accrual_cost'),
    value: 'accrual_cost'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.service_cost'),
    value: 'service_cost'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.all_profit_cost'),
    value: 'all_profit_cost'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.accrual_in_cost'),
    value: 'accrual_in_cost'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.bonus'),
    value: 'bonus'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.th_cost'),
    value: 'th_cost'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.freight_cost'),
    value: 'freight_cost'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.cash_pledge'),
    value: 'cash_pledge'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.last_not_pay'),
    value: 'last_not_pay'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.not_allot_profit'),
    value: 'not_allot_profit'
  },
  {
    text: t('bankReportView.info.secondLevelDetailFilter.other'),
    value: 'other'
  }
]

// 自定义
const columns = [
  {
    dataIndex: 'bank_report_date',
    key: 'bank_report_date',
    title: t('bankReportView.info.bankReportDate')
  },
  {
    dataIndex: 'bank_in',
    key: 'bank_in',
    title: t('bankReportView.info.bankIn')
  },
  {
    dataIndex: 'bank_out',
    key: 'bank_out',
    title: t('bankReportView.info.bankOut')
  },
  {
    dataIndex: 'remain',
    key: 'remain',
    title: t('bankReportView.info.remain')
  },
  {
    dataIndex: 'description',
    key: 'description',
    title: t('bankReportView.info.description')
  },
  {
    dataIndex: 'first_level_classify',
    key: 'first_level_classify',
    title: t('bankReportView.info.firstLevelClassify'),
    filters: firstLevelClassifyFilters
  },
  {
    dataIndex: 'second_level_detail',
    key: 'second_level_detail',
    title: t('bankReportView.info.secondLevelDetail'),
    filters: secondLevelDetailFilters
  },
  {
    dataIndex: 'project',
    key: 'project',
    title: t('bankReportView.info.project')
  }
].concat(
  getLocalStorage('bank-pay-currency') === 'THB'
    ? [
        {
          dataIndex: 'exchange_rate',
          key: 'exchange_rate',
          title: t('bankReportView.info.exchangeRate')
        },
        {
          dataIndex: 'rmb_in',
          key: 'rmb_in',
          title: t('bankReportView.info.rmbIn')
        },
        {
          dataIndex: 'rmb_out',
          key: 'rmb_out',
          title: t('bankReportView.info.rmbOut')
        },
        {
          dataIndex: 'rmb_remain',
          key: 'rmb_remain',
          title: t('bankReportView.info.rmbRemain')
        }
      ]
    : []
)

// 付款币种
const currentPayCurrency = ref<string>(getLocalStorage('bank-pay-currency') || 'CNY')
const selectBankReportPayCurrency = (payCurrency: string) => {
  currentPayCurrency.value = payCurrency
  setLocalStorage('bank-pay-currency', payCurrency)
  window.location.reload()
}

const queryData = (params: APIParams) => {
  // 自定义
  return axios.post<APIResult>('/bank/report/get_list', {
    pay_currency: currentPayCurrency.value,
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
  const _filters = Object.assign({}, filters)
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

const deleteBankReport = async (bankReport) => {
  // try {
  //   await axios.delete(`/user/${user.id}`)
  //   message.success(t('bankReportView.message.deleteUserSuccess'))
  //   window.location.reload()
  // } catch (error) {
  //   message.error(t('bankReportView.message.deleteUserFailed'))
  // }
}

const downloadBankReport = () => {}
const viewInBankReport = () => {}
const viewOutBankReport = () => {}
</script>

<template>
  <div class="bank-report-view">
    <div class="bank-report-header">
      <div style="display: flex">
        <div class="bank-report-title">{{ $t('route.reports.bankReport') }}</div>
        <div class="bank-report-type">
          <a-radio-group v-model:value="currentPayCurrency">
            <a-radio-button value="CNY" @click="selectBankReportPayCurrency('CNY')">{{
              $t('bankReportView.actions.selectCNYBankReport')
            }}</a-radio-button>
            <a-radio-button value="THB" @click="selectBankReportPayCurrency('THB')">{{
              $t('bankReportView.actions.selectTHBBankReport')
            }}</a-radio-button>
          </a-radio-group>
        </div>
      </div>

      <div class="bank-report-action">
        <a-button type="primary" @click="addBankReport">{{
          $t('bankReportView.actions.addBankReport')
        }}</a-button>
        <a-button type="primary" style="margin-left: 16px" @click="downloadBankReport" disabled>{{
          $t('bankReportView.actions.downloadBankReport')
        }}</a-button>
        <a-button type="primary" style="margin-left: 16px" @click="deleteBankReport" disabled>{{
          $t('bankReportView.actions.deleteBankReport')
        }}</a-button>
        <a-button type="primary" style="margin-left: 16px" @click="viewInBankReport" disabled>{{
          $t('bankReportView.actions.viewInBankReport')
        }}</a-button>
        <a-button type="primary" style="margin-left: 16px" @click="viewOutBankReport" disabled>{{
          $t('bankReportView.actions.viewOutBankReport')
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
                :title="$t('bankReportView.actions.confirmDeleteUser')"
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
    </a-table>
  </div>
  <UpsertBankReportModal
    v-if="showUpsertBankReportModal"
    :upsertBankReport="upsertBankReport"
    :currentPayCurrency="currentPayCurrency"
    :firstLevelClassifyFilters="firstLevelClassifyFilters"
    :secondLevelDetailFilters="secondLevelDetailFilters"
    @closeModal="() => toggleUpsertBankReportModal(false)"
  >
  </UpsertBankReportModal>
</template>

<style lang="less">
@import '@/assets/css/variables.less';

.bank-report-view {
  .bank-report-header {
    height: 60px;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }

  .bank-report-title {
    line-height: 32px;
    font-size: 16px;
    font-weight: bold;
  }

  .bank-report-type {
    margin-left: 16px;
  }

  .bank-report-action {
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
