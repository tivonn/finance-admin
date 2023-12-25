<script setup lang="ts">
import router from '@/router'
import { ref, watchEffect } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Language from '@/components/Language.vue'
import avatarImg from '@/assets/images/avatar.png'
import axios from '@/api/axios'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import { auth } from '@/utils/auth'
import { useStore } from '@/stores'
import UpdateUserModal from '@/components/UpdateUserModal.vue'

const { t } = useI18n()
const store = useStore()

// 路由相关
interface Nav {
  key: string
  text: string
  route: { name: string }
}

const route = useRoute()

const navigations = ref<
  Array<
    Nav & {
      subs?: Array<Nav>
    }
  >
>([
  {
    key: '/overview',
    text: t('route.overview'),
    route: {
      name: 'overview'
    }
  },
  {
    key: '/order',
    text: t('route.order'),
    route: {
      name: 'order'
    }
  },
  {
    key: '/report',
    text: t('route.report'),
    route: {
      name: 'report'
    },
    subs: [
      {
        key: '/report/bank',
        text: t('route.reports.bankReport'),
        route: {
          name: 'bankReport'
        }
      },
      {
        key: '/report/subject',
        text: t('route.reports.subjectCollect'),
        route: {
          name: 'subjectCollect'
        }
      }
    ]
  },
  {
    key: '/manage',
    text: t('route.manage'),
    route: {
      name: 'manage'
    },
    subs: [
      {
        key: '/manage/user',
        text: t('route.manages.manageUser'),
        route: {
          name: 'manageUser'
        }
      }
    ]
  }
])
const selectedKeys = ref<[string]>([route.path.slice('/main'.length)])

const hasAuthNavigation = (name: string) => {
  return (auth[name].allows || []).includes(store.user.role)
}

const gotoNavigation = (navigation: Nav) => {
  router.push({ name: navigation.route?.name })
}

// 用户设置
const showUpdateUserModal = ref<boolean>(false)

const toggleUpdateUserModal = (isShow: boolean) => {
  showUpdateUserModal.value = isShow
}

const updateUser = () => {
  toggleUpdateUserModal(true)
}

// 首次登录引导修改密码
watchEffect(() => {
  if (store.isLogin && !store.user.is_modified_password) {
    toggleUpdateUserModal(true)
  }
})

const logout = () => {
  try {
    axios.post('/user/logout')
  } catch (error) {
    message.error(t('common.message.logoutFailed'))
  }
}
</script>

<template>
  <a-layout class="main-view">
    <a-layout-header class="main-header">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        class="main-navigation"
      >
        <template
          v-for="navigation in navigations.filter((navigation) =>
            hasAuthNavigation(navigation.route.name)
          )"
        >
          <a-menu-item
            v-if="!navigation.subs"
            :key="navigation.key"
            @click="() => gotoNavigation(navigation)"
          >
            <!-- 一级路由 -->
            <span> {{ navigation.text }}</span>
          </a-menu-item>
          <a-sub-menu v-else :key="`${navigation.key}-sub`">
            <!-- 一级路由 -->
            <template #title>
              <span>
                {{ navigation.text }}
              </span>
            </template>
            <!-- 二级路由 -->
            <a-menu-item
              v-for="subNavigation in navigation.subs.filter((subNavigation) =>
                hasAuthNavigation(subNavigation.route.name)
              )"
              :key="subNavigation.key"
              @click="() => gotoNavigation(subNavigation)"
              >{{ subNavigation.text }}</a-menu-item
            >
          </a-sub-menu>
        </template>
      </a-menu>
      <div class="main-actions">
        <Language class="language"></Language>
        <a-dropdown>
          <img :src="avatarImg" class="avatar" @click.prevent />
          <template #overlay>
            <a-menu
              ><a-menu-item @click="() => updateUser()">
                <span>{{ $t('common.actions.updateUser') }}</span>
              </a-menu-item>
              <a-menu-item @click="() => logout()">
                <span>{{ $t('common.actions.logout') }}</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout-content class="main-content">
      <RouterView />
    </a-layout-content>
    <UpdateUserModal
      v-if="showUpdateUserModal"
      @closeModal="() => toggleUpdateUserModal(false)"
    ></UpdateUserModal>
  </a-layout>
</template>

<style lang="less">
.main-view {
  width: 100%;
  min-width: 960px;
  height: 100%;
  .main-header {
    height: 48px;
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: row;
  }
  .main-navigation {
    line-height: 48px;
  }
  .main-actions {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  .language {
    line-height: 48px;
  }
  .avatar {
    width: 24px;
    height: 24px;
    margin-left: 24px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
  }
  .main-content {
    min-height: calc(100% - 48px);
    background-color: #fff;
  }
}
</style>
