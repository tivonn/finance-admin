<script setup lang="ts">
import { usePagination } from 'vue-request'
import { computed, ref } from 'vue'
import axios from '@/api/axios'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import UpsertBankReportModal from '@/views/main/report/bank/UpsertBankReportModal.vue'
import { message } from 'ant-design-vue'
import { useStore } from '@/stores'
import { getLocalStorage, keepTwoDecimalStr, setLocalStorage } from '@/utils/common'
import dayjs, { Dayjs } from 'dayjs'
import lodash from 'lodash'

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

// 自定义
const columns = [
  {
    dataIndex: 'project',
    key: 'project',
    title: t('ProfitView.info.project')
  },
  {
    dataIndex: 'id',
    key: 'id',
    title: t('ProfitView.info.row')
  },
  {
    title: t('ProfitView.info.money'),
    children: [
      {
        dataIndex: 'january',
        key: 'january',
        title: t('ProfitView.info.january'),
        customRender: ({ text }: { text: string }) => {
          return keepTwoDecimalStr(text)
        }
      },
      {
        dataIndex: 'february',
        key: 'february',
        title: t('ProfitView.info.february'),
        customRender: ({ text }: { text: string }) => {
          return keepTwoDecimalStr(text)
        }
      },
      {
        dataIndex: 'march',
        key: 'march',
        title: t('ProfitView.info.march'),
        customRender: ({ text }: { text: string }) => {
          return keepTwoDecimalStr(text)
        }
      },
      {
        dataIndex: 'april',
        key: 'april',
        title: t('ProfitView.info.april'),
        customRender: ({ text }: { text: string }) => {
          return keepTwoDecimalStr(text)
        }
      },
      {
        dataIndex: 'may',
        key: 'may',
        title: t('ProfitView.info.may'),
        customRender: ({ text }: { text: string }) => {
          return keepTwoDecimalStr(text)
        }
      },
      {
        dataIndex: 'june',
        key: 'june',
        title: t('ProfitView.info.june'),
        customRender: ({ text }: { text: string }) => {
          return keepTwoDecimalStr(text)
        }
      },
      {
        dataIndex: 'july',
        key: 'july',
        title: t('ProfitView.info.july'),
        customRender: ({ text }: { text: string }) => {
          return keepTwoDecimalStr(text)
        }
      },
      {
        dataIndex: 'august',
        key: 'august',
        title: t('ProfitView.info.august'),
        customRender: ({ text }: { text: string }) => {
          return keepTwoDecimalStr(text)
        }
      },
      ,
      {
        dataIndex: 'september',
        key: 'september',
        title: t('ProfitView.info.september'),
        customRender: ({ text }: { text: string }) => {
          return keepTwoDecimalStr(text)
        }
      },
      {
        dataIndex: 'october',
        key: 'october',
        title: t('ProfitView.info.october'),
        customRender: ({ text }: { text: string }) => {
          return keepTwoDecimalStr(text)
        }
      },
      {
        dataIndex: 'november',
        key: 'november',
        title: t('ProfitView.info.november'),
        customRender: ({ text }: { text: string }) => {
          return keepTwoDecimalStr(text)
        }
      },
      {
        dataIndex: 'december',
        key: 'december',
        title: t('ProfitView.info.december'),
        customRender: ({ text }: { text: string }) => {
          return keepTwoDecimalStr(text)
        }
      },
      {
        dataIndex: 'total',
        key: 'total',
        title: t('ProfitView.info.total'),
        customRender: ({ text }: { text: string }) => {
          return keepTwoDecimalStr(text)
        }
      }
    ]
  }
]

// 当前年份
const currentYear = ref<Dayjs>(
  getLocalStorage('profit-year') ? dayjs(getLocalStorage('profit-year')) : dayjs()
)
const selectYear = (year: Dayjs) => {
  currentYear.value = year
  setLocalStorage('profit-year', dayjs(year).format('YYYY'))
  window.location.reload()
}

const queryData = (params: APIParams) => {
  // 自定义
  return axios.post<APIResult>('/profit/report/get_list', {
    year: currentYear.value,
    language: getLocalStorage('language') || 'zh-cn',
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
  <div class="profit-view">
    <div class="profit-header">
      <div style="display: flex">
        <div class="profit-title">{{ $t('route.reports.profit') }}</div>
        <div class="profit-type">
          <a-date-picker
            v-model:value="currentYear"
            picker="year"
            :placeholder="$t('common.actions.yearSelectPlaceholder')"
            style="margin-left: 16px"
            :allowClear="false"
            @change="selectYear"
          />
        </div>
      </div>

      <div class="profit-action">
        <!-- <a-button type="primary" style="margin-left: 16px" @click="downloadBankReport" disabled>{{
          $t('subjectCollectView.actions.downloadBankReport')
        }}</a-button> -->
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
      :pagination="false"
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
    </a-table>
  </div>
</template>

<style lang="less">
@import '@/assets/css/variables.less';

.profit-view {
  .profit-header {
    height: 60px;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }

  .profit-title {
    line-height: 32px;
    font-size: 16px;
    font-weight: bold;
  }

  .profit-type {
    margin-left: 16px;
  }

  .profit-action {
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
