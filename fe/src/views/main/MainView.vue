<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'

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
  }
  .main-navigation {
    line-height: 48px;
  }
  .main-content {
    min-height: calc(100% - 48px);
    background-color: #fff;
  }
}
</style>
