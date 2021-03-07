import Vue from 'vue'
import VueRouter from 'vue-router'

// layout
import DefaultLayout from '@/layout/DefaultLayout.vue'

// modules
import dashboard from './modules/dashboard'
import demo from './modules/demo'
import setting from './modules/setting'
import overview from './modules/overview'

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
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    children: [
      ...dashboard,
      ...demo,
      ...setting,
      ...overview
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
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
