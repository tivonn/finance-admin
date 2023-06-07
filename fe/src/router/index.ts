import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/stores'
import pinia from '@/stores'
import { auth } from '@/utils/auth'

declare module 'vue-router' {
  interface RouteMeta {
    auth: {
      required: boolean
      allows?: Array<string>
    }
  }
}

const store = useStore(pinia)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 登录页
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue'),
      meta: { auth: auth['login'] }
    },
    {
      // 主页面
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/MainView.vue'),
      meta: { auth: auth['main'] },
      children: [
        // 总览
        {
          path: 'overview',
          name: 'overview',
          component: () => import('@/views/main/overview/OverviewView.vue'),
          meta: { auth: auth['overview'] }
        },
        // 订单
        {
          path: 'order',
          name: 'order',
          component: () => import('@/views/main/order/OrderView.vue'),
          meta: { auth: auth['order'] }
        },
        // 财务报表
        {
          path: 'report',
          name: 'report',
          component: () => import('@/views/main/report/ReportView.vue'),
          meta: { auth: auth['report'] }
        },
        // 管理页
        {
          path: 'manage',
          name: 'manage',
          meta: { auth: auth['manage'] },
          children: [
            // 员工管理
            {
              path: 'user',
              name: 'manageUser',
              component: () => import('@/views/main/manage/user/ManageUserView.vue'),
              meta: { auth: auth['manageUser'] }
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, _, next) => {
  if (!to.meta.auth) {
    // 非已定义的页面
    if (store.isLogin) {
      // 已登录
      next({
        name: 'overview'
      })
    } else {
      // 未登录
      next({
        name: 'login'
      })
    }
  } else {
    // 已定义的页面
    if (to.meta.auth.required) {
      // 需要权限
      if (store.isLogin) {
        // 已登录
        if (to.meta.auth?.allows?.includes(store.user.role)) {
          // 有权限访问页面，放行
          next()
        } else {
          // 无权限访问页面，不放行，跳转总览页
          next({
            name: 'overview'
          })
        }
      } else {
        // 未登录，不放行，跳转登录页
        next({
          name: 'login'
        })
      }
    } else {
      // 不需要权限，目前仅登录页
      if (store.isLogin) {
        next({
          name: 'overview'
        })
      } else {
        next()
      }
    }
  }
})

export default router
