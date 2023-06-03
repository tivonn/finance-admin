<script setup lang="ts">
import { usePagination } from 'vue-request'
import { computed } from 'vue'
import axios from 'axios'
import type { UserRes } from '@/api/res/user'

// 获取表格数据 START
interface APIParams {
  pageSize: number
  page?: number
  sortField?: string
  sortOrder?: number
  [key: string]: any
}
interface APIResult {
  data: Array<UserRes>
}

// 自定义
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: '30%'
  },
  {
    title: '账号',
    dataIndex: 'account',
    width: '30%'
  },
  {
    title: '权限',
    dataIndex: 'role',
    filters: [
      { text: '管理员', value: 'admin' },
      { text: '员工', value: 'staff' },
      { text: '财务', value: 'finance' },
      { text: '用户', value: 'user' }
    ],
    width: '20%'
  }
]

const queryData = (params: APIParams) => {
  // 自定义
  return axios.get<APIResult>('/user/list', { params })
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
    currentKey: 'page',
    pageSizeKey: 'pageSize',
    totalKey: 'data.total'
  }
})

const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value
}))

// 获取表格数据 END

// 操作表格
const handleTableChange: any = (
  pag: { pageSize: number; current: number },
  filters: any,
  sorter: any
) => {
  run({
    page: pag?.current,
    pageSize: pag.pageSize!,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters
  })
}
</script>

<template>
  <a-table
    :columns="columns"
    :row-key="(row: any) => row.id"
    :data-source="dataSource?.data.data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <!-- <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
    </template> -->
  </a-table>
</template>

<style lang="less"></style>
