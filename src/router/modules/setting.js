export default [
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/layout/SlotLayout'),
    meta: {
      title: '設定',
      icon: 'setting'
    },
    children: [
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/layout/SlotLayout'),
        meta: {
          title: '權限設定',
          icon: 'lock'
        },
        children: [
          {
            path: 'member',
            name: 'Member',
            component: () => import('@/views/setting/member'),
            meta: {
              title: '帳號管理',
              icon: 'user'
            }
          },
          {
            path: 'role',
            name: 'Role',
            component: () => import('@/views/setting/role'),
            meta: {
              title: '角色管理',
              icon: 'user'
            }
          }
        ]
      }
    ]
  }
]
