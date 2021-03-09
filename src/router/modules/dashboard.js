export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '儀表板',
      icon: 'dashboard',
      affix: true
    }
  }
]
