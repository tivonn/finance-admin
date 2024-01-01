<script setup lang="ts">
import { usePagination } from 'vue-request'
import { computed, ref } from 'vue'
import axios from '@/api/axios'
import {
  SearchOutlined,
  EditOutlined,
  DownloadOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import UpsertOrderModal from '@/views/main/order/UpsertOrderModal.vue'
import { message } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { TableProps, UploadChangeParam } from 'ant-design-vue'
import { baseURL } from '@/api/axios'
import { timeout } from '@/utils/common'
import type { OrderRes } from '@/api/res/order'
import dayjs from 'dayjs'
import { useStore } from '@/stores'
import { downloadFile } from '@/utils/common'

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
  rows: Array<OrderRes>
}

// 自定义
const columns = [
  {
    dataIndex: 'user_code',
    key: 'user_code',
    title: t('orderView.info.user_code'),
    width: 150,
    customFilterDropdown: true
  },
  {
    dataIndex: 'receive_goods_date',
    key: 'receive_goods_date',
    title: t('orderView.info.receive_goods_date'),
    width: 150,
    customRender: ({ text }: { text: string }) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : ''
    }
  },
  {
    dataIndex: 'warehouse',
    key: 'warehouse',
    title: t('orderView.info.warehouse'),
    width: 150
  },
  {
    dataIndex: 'waybill_number',
    key: 'waybill_number',
    title: t('orderView.info.waybill_number'),
    width: 150,
    customFilterDropdown: true
  },
  {
    dataIndex: 'goods_number',
    key: 'goods_number',
    title: t('orderView.info.goods_number'),
    width: 150
  },
  {
    dataIndex: 'goods_name',
    key: 'goods_name',
    title: t('orderView.info.goods_name'),
    width: 150
  },
  {
    dataIndex: 'transport_mode',
    key: 'transport_mode',
    title: t('orderView.info.transport_mode'),
    width: 100
  },
  {
    dataIndex: 'count',
    key: 'count',
    title: t('orderView.info.count'),
    width: 100
  },
  {
    dataIndex: 'number',
    key: 'number',
    title: t('orderView.info.number'),
    width: 100
  },
  {
    dataIndex: 'description',
    key: 'description',
    title: t('orderView.info.description'),
    width: 300
  },
  {
    dataIndex: 'weight',
    key: 'weight',
    title: t('orderView.info.weight'),
    width: 100
  },
  {
    dataIndex: 'inner_size_length',
    key: 'inner_size_length',
    title: t('orderView.info.inner_size_length'),
    width: 200
  },
  {
    dataIndex: 'inner_size_width',
    key: 'inner_size_width',
    title: t('orderView.info.inner_size_width'),
    width: 200
  },
  {
    dataIndex: 'inner_size_height',
    key: 'inner_size_height',
    title: t('orderView.info.inner_size_height'),
    width: 200
  },
  {
    dataIndex: 'volume',
    key: 'volume',
    title: t('orderView.info.volume'),
    width: 150
  },
  {
    dataIndex: 'unit_price',
    key: 'unit_price',
    title: t('orderView.info.unit_price'),
    width: 100
  },
  {
    dataIndex: 'good_value',
    key: 'good_value',
    title: t('orderView.info.good_value'),
    width: 100
  },
  {
    dataIndex: 'rate',
    key: 'rate',
    title: t('orderView.info.rate'),
    width: 100
  },
  {
    dataIndex: 'insurance',
    key: 'insurance',
    title: t('orderView.info.insurance'),
    width: 100
  },
  {
    dataIndex: 'packing_cost',
    key: 'packing_cost',
    title: t('orderView.info.packing_cost'),
    width: 100
  },
  {
    dataIndex: 'disbursements',
    key: 'disbursements',
    title: t('orderView.info.disbursements'),
    width: 100
  },
  {
    dataIndex: 'compensate',
    key: 'compensate',
    title: t('orderView.info.compensate'),
    width: 100
  },
  {
    dataIndex: 'client_freight',
    key: 'client_freight',
    title: t('orderView.info.client_freight'),
    width: 150
  },
  {
    dataIndex: 'stuffing_number',
    key: 'stuffing_number',
    title: t('orderView.info.stuffing_number'),
    width: 150,
    customFilterDropdown: true
  },
  {
    dataIndex: 'warehouse_size_length',
    key: 'warehouse_size_length',
    title: t('orderView.info.warehouse_size_length'),
    width: 200
  },
  {
    dataIndex: 'warehouse_size_width',
    key: 'warehouse_size_width',
    title: t('orderView.info.warehouse_size_width'),
    width: 200
  },
  {
    dataIndex: 'warehouse_size_height',
    key: 'warehouse_size_height',
    title: t('orderView.info.warehouse_size_height'),
    width: 200
  },
  {
    dataIndex: 'warehouse_volumn',
    key: 'warehouse_volumn',
    title: t('orderView.info.warehouse_volumn'),
    width: 200
  },
  {
    dataIndex: 'cost_unit_price',
    key: 'cost_unit_price',
    title: t('orderView.info.cost_unit_price'),
    width: 100
  },
  {
    dataIndex: 'cost_packing_cost',
    key: 'cost_packing_cost',
    title: t('orderView.info.cost_packing_cost'),
    width: 150
  },
  {
    dataIndex: 'warehouse_freight',
    key: 'warehouse_freight',
    title: t('orderView.info.warehouse_freight'),
    width: 150
  },
  {
    dataIndex: 'payed_date',
    key: 'payed_date',
    title: t('orderView.info.payed_date'),
    width: 150,
    customRender: ({ text }: { text: string }) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : ''
    }
  },
  {
    dataIndex: 'pay_currency',
    key: 'pay_currency',
    title: t('orderView.info.pay_currency'),
    width: 150,
    customRender: ({ text }: { text: string }) => {
      switch (text) {
        case 'CNY': {
          return t('orderView.info.CNY')
        }
        case 'THB': {
          return t('orderView.info.THB')
        }
        default: {
          return ''
        }
      }
    }
  },
  {
    dataIndex: 'status',
    key: 'status',
    title: t('orderView.info.status'),
    fixed: 'right',
    width: 150,
    filters: [
      {
        text: t('orderView.info.client_cost_to_be_record'),
        value: 'client_cost_to_be_record',
        color: 'red'
      },
      {
        text: t('orderView.info.warehouse_cost_to_be_record'),
        value: 'warehouse_cost_to_be_record',
        color: 'orange'
      },
      {
        text: t('orderView.info.finance_cost_to_be_record'),
        value: 'finance_cost_to_be_record',
        color: 'grey'
      },
      { text: t('orderView.info.cost_to_be_pay'), value: 'cost_to_be_pay', color: 'blue' },
      { text: t('orderView.info.cost_has_payed'), value: 'cost_has_payed', color: 'green' }
    ]
  },
  { key: 'action', title: t('common.info.action'), fixed: 'right', width: 100 }
]

const queryData = (params: APIParams) => {
  // 自定义
  return axios.post<APIResult>('/order/get_list', params)
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
    filters.user_code
      ? {
          user_code: filters.user_code[0]
        }
      : {},
    filters.waybill_number
      ? {
          waybill_number: filters.waybill_number[0]
        }
      : {},
    filters.stuffing_number
      ? {
          stuffing_number: filters.stuffing_number[0]
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
const showUpsertOrderModal = ref<boolean>(false)
const upsertOrder = ref<OrderRes | {}>({})

const canUpsertOrder = (order: OrderRes): boolean => {
  let safeRoles: Array<string> = []
  switch (order.status) {
    case 'client_cost_to_be_record': {
      safeRoles = ['admin', 'finance', 'staff']
      break
    }
    case 'warehouse_cost_to_be_record': {
      safeRoles = ['admin', 'finance', 'staff']
      break
    }
    case 'finance_cost_to_be_record': {
      safeRoles = ['admin', 'finance']
      break
    }
    case 'cost_to_be_pay': {
      safeRoles = ['admin', 'finance']
      break
    }
    default: {
      safeRoles = []
      break
    }
  }
  return safeRoles.includes(store.user.role)
}

const canDeleteOrder = (): boolean => {
  const safeRoles = ['admin']
  return safeRoles.includes(store.user.role)
}

const toggleUpsertOrderModal = (isShow: boolean) => {
  showUpsertOrderModal.value = isShow
  if (!isShow) {
    upsertOrder.value = {}
  }
}

const updateOrder = (order: OrderRes) => {
  upsertOrder.value = order
  toggleUpsertOrderModal(true)
}

const deleteOrder = async (order: OrderRes) => {
  try {
    await axios.delete(`/order/${order.id}`)
    message.success(t('orderView.message.deleteOrderSuccess'))
    window.location.reload()
  } catch (error) {
    message.error(t('orderView.message.deleteOrderFailed'))
  }
}

// 下载模板
const downloadTemplate = async () => {
  try {
    let dom = document.createElement('a')
    dom.href = '/static/templates/货品详情表.xlsx'
    dom.download = '货品详情表.xlsx'
    document.body.appendChild(dom)
    dom.click()
    document.body.removeChild(dom)
  } catch (error) {
    message.error(t('orderView.message.downloadTemplateFailed'))
  }
}

// 上传 Excel
const uploadExcel = (info: UploadChangeParam) => {
  if (info.file.status === 'done') {
    message.success(t('orderView.message.uploadSuccess'))
    setTimeout(() => {
      window.location.reload()
    }, timeout)
  } else if (info.file.status === 'error') {
    switch (info.file.error?.status) {
      case 422: {
        message.error(t('orderView.message.excelInvalid'))
        break
      }
      default: {
        message.error(t('orderView.message.uploadFailed'))
      }
    }
  }
}

// 导出送货单
const canDownloadDeliveryBill = (order: OrderRes): boolean => {
  const safeRoles = ['admin', 'finance', 'staff']
  const safeStatus = ['cost_to_be_pay', 'cost_has_payed']
  return safeRoles.includes(store.user.role) && safeStatus.includes(order.status)
}

const selectedRowKeys = ref<Array<number>>([])

const rowSelection: TableProps['rowSelection'] = {
  onChange: (_selectedRowKeys: Array<number>) => {
    selectedRowKeys.value = _selectedRowKeys
  },
  getCheckboxProps: (record: OrderRes) => ({
    disabled: record.status !== 'cost_to_be_pay' && record.status !== 'cost_has_payed'
  })
}

const downloadDeliveryBill = async (order: OrderRes) => {
  try {
    const res = await axios.post(
      `/order/download_delivery_bills`,
      { ids: [order.id] },
      { responseType: 'blob' }
    )
    downloadFile(res.data, '送货单.xls')
    message.success(t('orderView.message.downloadDeliveryBillSuccess'))
  } catch (error: any) {
    // blob 类型，适配
    var reader = new FileReader()
    reader.readAsBinaryString(error?.response?.data)
    reader.onload = function () {
      const result = JSON.parse((this.result as string) || '{}')
      switch (result.message) {
        case 'noAuth': {
          message.error(t('common.message.noAuth'))
          break
        }
        case 'downloadDeliveryBillNoOrderFailed': {
          message.error(t('orderView.message.downloadDeliveryBillNoOrderFailed'))
          break
        }
        case 'downloadDeliveryBillStatusFailed': {
          message.error(t('orderView.message.downloadDeliveryBillStatusFailed'))
          break
        }
        case 'downloadDeliveryBillUserCodeFailed': {
          message.error(t('orderView.message.downloadDeliveryBillUserCodeFailed'))
          break
        }
        case 'downloadDeliveryBillStuffingNumberFailed': {
          message.error(t('orderView.message.downloadDeliveryBillStuffingNumberFailed'))
          break
        }
        default: {
          message.error(t('orderView.message.downloadDeliveryBillFailed'))
        }
      }
    }
  }
}
</script>

<template>
  <div class="order-view">
    <div class="order-header">
      <div class="order-title">{{ $t('route.order') }}</div>
      <div class="order-action">
        <a-button type="primary" class="download-template-button" @click="downloadTemplate">{{
          $t('orderView.actions.downloadTemplate')
        }}</a-button>
        <a-upload
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :action="`${baseURL}/order/list`"
          :maxCount="1"
          :showUploadList="false"
          :withCredentials="true"
          @change="uploadExcel"
        >
          <a-button type="primary" class="upload-excel-button">
            <upload-outlined></upload-outlined>
            <span> {{ $t('orderView.actions.uploadExcel') }}</span>
          </a-button>
        </a-upload>
        <!-- <a-button type="primary" class="download-bills-button" @click="downloadDeliveryBill">{{
          $t('orderView.actions.downloadDeliveryBill')
        }}</a-button> -->
      </div>
    </div>
    <a-table
      :columns="columns"
      :row-key="(row: OrderRes) => row.id"
      :data-source="dataSource?.data.rows"
      :locale="{
        filterConfirm: $t('common.actions.confirm'),
        filterReset: $t('common.actions.reset')
      }"
      :pagination="pagination"
      :loading="loading"
      :scroll="{ x: 100 }"
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
      <!-- 表格内容 -->
      <template #bodyCell="{ record, column, text }">
        <!-- 状态 -->
        <template v-if="column.key === 'status'">
          <a-tag
            :key="text"
            :color="column.filters.find((role: any) => role.value === text)?.color"
          >
            {{ column.filters.find((role: any) => role.value === text)?.text }}
          </a-tag>
        </template>
        <!-- 操作 -->
        <template v-else-if="column.key === 'action'">
          <span class="action">
            <template v-if="canUpsertOrder(record)">
              <edit-outlined class="edit-action" @click="() => updateOrder(record)" />
              <a-divider type="vertical"
            /></template>
            <template v-if="canDownloadDeliveryBill(record)">
              <download-outlined
                class="download-action"
                @click="() => downloadDeliveryBill(record)" />
              <a-divider type="vertical"
            /></template>
            <a-popconfirm
              v-if="canDeleteOrder()"
              :title="$t('orderView.actions.confirmDeleteOrder')"
              :ok-text="$t('common.actions.confirm')"
              :cancel-text="$t('common.actions.cancel')"
              @confirm="() => deleteOrder(record)"
              style="width: 600px"
            >
              <delete-outlined class="delete-action" />
            </a-popconfirm>
            <span
              v-if="
                !canUpsertOrder(record) && !canDownloadDeliveryBill(record) && !canDeleteOrder()
              "
              >-</span
            >
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <UpsertOrderModal
    v-if="showUpsertOrderModal"
    :upsertOrder="upsertOrder"
    @closeModal="() => toggleUpsertOrderModal(false)"
  ></UpsertOrderModal>
</template>

<style lang="less">
@import '@/assets/css/variables.less';

.order-view {
  .order-header {
    height: 60px;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }
  .order-title {
    font-size: 16px;
    font-weight: bold;
  }
  .order-action {
    margin-left: auto;
    display: flex;
  }
  .upload-excel-button,
  .download-bills-button {
    margin-left: 16px;
  }
  .action {
    .edit-action,
    .download-action,
    .delete-action {
      &:hover {
        cursor: pointer;
      }
    }
    .edit-action,
    .download-action {
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
