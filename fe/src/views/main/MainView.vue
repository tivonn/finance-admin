<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Language from '@/components/Language.vue'
import avatarImg from '@/assets/images/avatar.png'
import axios from '@/api/axios'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'

const { t } = useI18n()

interface Nav {
  key: string
  text: string
  route?: { name: string }
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
    text: '总览',
    route: {
      name: 'overview'
    }
  },
  {
    key: '/order',
    text: '订单详情',
    route: {
      name: 'order'
    }
  },
  {
    key: '/report',
    text: '财务报表',
    route: {
      name: 'report'
    }
  },
  {
    key: '/manage',
    text: '管理',
    subs: [
      {
        key: '/manage/user',
        text: '用户管理',
        route: {
          name: 'userManage'
        }
      }
    ]
  }
])
const selectedKeys = ref<[string]>([route.path.slice('/main'.length)])

const gotoNavigation = (navigation: Nav) => {
  router.push({ name: navigation.route?.name })
}

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
        <template v-for="navigation in navigations">
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
              v-for="subNavigation in navigation.subs"
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
            <a-menu>
              <a-menu-item>
                <span @click="() => logout()">{{ $t('common.info.logout') }}</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout-content class="main-content">
      <RouterView />
    </a-layout-content>
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
