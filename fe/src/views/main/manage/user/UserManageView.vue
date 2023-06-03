<script setup lang="ts">
import { usePagination } from 'vue-request'
import { computed, ref } from 'vue'
import axios from 'axios'
import type { UserRes } from '@/api/res/user'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import UserUpsertModal from '@/views/main/manage/user/UserUpsertModal.vue'

const { t } = useI18n()

const showUserUpsertModal = ref<boolean>(false)
const userUpsertId = ref<number>(0)

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
    title: t('commonBiz.user.username'),
    dataIndex: 'username',
    key: 'username',
    width: '35%',
    customFilterDropdown: true
  },
  {
    title: t('commonBiz.user.account'),
    dataIndex: 'account',
    key: 'account',
    width: '35%'
  },
  {
    title: t('commonBiz.user.role'),
    dataIndex: 'role',
    key: 'role',
    width: '20%',
    filters: [
      { text: t('commonBiz.user.roles.admin'), value: 'admin', color: 'green' },
      { text: t('commonBiz.user.roles.finance'), value: 'finance', color: 'purple' },
      { text: t('commonBiz.user.roles.staff'), value: 'staff', color: 'orange' },
      { text: t('commonBiz.user.roles.external'), value: 'external', color: 'red' }
    ]
  },
  {
    key: 'action',
    fixed: 'right',
    width: '10%'
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
  pageSize: pageSize.value,
  showSizeChanger: false
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

// 筛选
const handleSearch = (confirm: Function) => {
  confirm()
}

const handleReset = (clearFilters: Function) => {
  clearFilters({ confirm: true })
}

// 修改数据
const addUser = () => {
  toggleUserUpsertModal(true)
}

const toggleUserUpsertModal = (isShow: boolean) => {
  showUserUpsertModal.value = isShow
  if (!isShow) {
    userUpsertId.value = 0
  }
}

const updateUser = (user: UserRes) => {}

const deleteUser = (user: UserRes) => {
  console.log(user)
}
</script>

<template>
  <div class="user-manage-view">
    <div class="user-manage-header">
      <a-button type="primary" class="add-user-button" @click="addUser">{{
        $t('userManageView.actions.addUser')
      }}</a-button>
    </div>
    <a-table
      :columns="columns"
      :row-key="(row: any) => row.id"
      :data-source="dataSource?.data.data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- 表头 -->
      <template #headerCell="{ column }">
        <!-- 操作 -->
        <template v-if="column.key === 'action'">
          <span
            :style="{
              fontWeight: 'bold'
            }"
            >{{ $t('userManageView.info.action') }}</span
          >
        </template>
      </template>
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
            :placeholder="`${$t('userManageView.actions.search')}${column.title}`"
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
            {{ $t('userManageView.actions.search') }}
          </a-button>
          <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
            {{ $t('userManageView.actions.reset') }}
          </a-button>
        </div>
      </template>
      <!-- 表格内容 -->
      <template #bodyCell="{ record, column, text }">
        <!-- 权限 -->
        <template v-if="column.key === 'role'">
          <a-tag
            :key="text"
            :color="column.filters.find((role: any) => role.value === text)?.color || 'green'"
          >
            {{ column.filters.find((role: any) => role.value === text)?.text }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <span class="action">
            <edit-outlined class="edit-action" @click="() => updateUser(record)" />
            <a-divider type="vertical" />
            <a-popconfirm
              :title="$t('userManageView.actions.confirmDeleteUser')"
              ok-text="Yes"
              cancel-text="No"
              @confirm="() => deleteUser(record)"
            >
              <delete-outlined class="delete-action" />
            </a-popconfirm>
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <UserUpsertModal
    v-if="showUserUpsertModal"
    :userUpsertId="userUpsertId"
    @closeModal="() => toggleUserUpsertModal(false)"
  ></UserUpsertModal>
</template>

<style lang="less">
@import '@/assets/css/variables.less';

.user-manage-view {
  .user-manage-header {
    height: 60px;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }
  .add-user-button {
    margin-left: auto;
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
