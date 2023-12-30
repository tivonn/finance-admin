<script setup lang="ts">
import { usePagination } from 'vue-request'
import { computed, ref } from 'vue'
import axios from '@/api/axios'
import type { UserRes } from '@/api/res/user'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import UpsertUserModal from '@/views/main/manage/user/UpsertUserModal.vue'
import { message } from 'ant-design-vue'
import { useStore } from '@/stores'

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
  rows: Array<UserRes>
}

// 自定义
const columns = [
  {
    dataIndex: 'username',
    key: 'username',
    title: t('commonBiz.user.username'),
    width: '25%',
    customFilterDropdown: true
  },
  {
    dataIndex: 'account',
    key: 'account',
    title: t('commonBiz.user.account'),
    width: '25%'
  },
  {
    dataIndex: 'role',
    key: 'role',
    title: t('commonBiz.user.role'),
    width: '10%',
    filters: [
      { text: t('commonBiz.user.roles.admin'), value: 'admin', color: 'green' },
      { text: t('commonBiz.user.roles.finance'), value: 'finance', color: 'blue' },
      { text: t('commonBiz.user.roles.staff'), value: 'staff', color: 'orange' },
      { text: t('commonBiz.user.roles.external'), value: 'external', color: 'red' }
    ]
  },
  {
    dataIndex: 'phone_number',
    key: 'phone_number',
    title: t('commonBiz.user.phoneNumber'),
    width: '30%'
  },
  { key: 'action', title: t('common.info.action'), fixed: 'right', width: 100 }
]

const queryData = (params: APIParams) => {
  // 自定义
  return axios.post<APIResult>('/user/get_list', params)
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
    filters.username
      ? {
          username: filters.username[0]
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
const showUpsertUserModal = ref<boolean>(false)
const upsertUser = ref<UserRes | {}>({})

const canEditUser = (): boolean => {
  const safeRoles = ['admin']
  return safeRoles.includes(store.user.role)
}
const toggleUpsertUserModal = (isShow: boolean) => {
  showUpsertUserModal.value = isShow
  if (!isShow) {
    upsertUser.value = {}
  }
}

const addUser = () => {
  upsertUser.value = {}
  toggleUpsertUserModal(true)
}

const updateUser = (user: UserRes) => {
  upsertUser.value = user
  toggleUpsertUserModal(true)
}

const deleteUser = async (user: UserRes) => {
  try {
    await axios.delete(`/user/${user.id}`)
    message.success(t('manageUserView.message.deleteUserSuccess'))
    window.location.reload()
  } catch (error) {
    message.error(t('manageUserView.message.deleteUserFailed'))
  }
}
</script>

<template>
  <div class="manage-user-view">
    <div class="manage-user-header">
      <div class="manage-user-title">{{ $t('route.manages.manageUser') }}</div>
      <div class="manage-user-action">
        <a-button type="primary" @click="addUser">{{
          $t('manageUserView.actions.addUser')
        }}</a-button>
      </div>
    </div>
    <a-table
      :columns="columns"
      :row-key="(row: UserRes) => row.id"
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
      <!-- 表格内容 -->
      <template #bodyCell="{ record, column, text }">
        <!-- 权限 -->
        <template v-if="column.key === 'role'">
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
            <template v-if="canEditUser()">
              <edit-outlined class="edit-action" @click="() => updateUser(record)" />
              <a-divider type="vertical" />
              <a-popconfirm
                :title="$t('manageUserView.actions.confirmDeleteUser')"
                :ok-text="$t('common.actions.confirm')"
                :cancel-text="$t('common.actions.cancel')"
                @confirm="() => deleteUser(record)"
              >
                <delete-outlined class="delete-action" />
              </a-popconfirm>
            </template>
            <span v-else>-</span>
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <UpsertUserModal
    v-if="showUpsertUserModal"
    :upsertUser="upsertUser"
    @closeModal="() => toggleUpsertUserModal(false)"
  ></UpsertUserModal>
</template>

<style lang="less">
@import '@/assets/css/variables.less';

.manage-user-view {
  .manage-user-header {
    height: 60px;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }
  .manage-user-title {
    font-size: 16px;
    font-weight: bold;
  }
  .manage-user-action {
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
