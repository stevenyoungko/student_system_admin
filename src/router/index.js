import Vue from 'vue'
import VueRouter from 'vue-router'

// layout
import DefaultLayout from '@/layout/DefaultLayout.vue'

// modules
import dashboard from './modules/dashboard'
import demo from './modules/demo'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    meta: {
      title: '登入'
    }
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    children: [
      ...dashboard,
      ...demo
    ]
  }
]

const router = new VueRouter({
  routes: constantRoutes,
  mode: 'history',
  base: '/',
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router