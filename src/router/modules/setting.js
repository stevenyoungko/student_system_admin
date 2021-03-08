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
        component: () => import('@/views/settings/permission'),
        meta: {
          title: '權限設定',
          icon: 'lock'
        }
        // children: [
        //   {
        //     path: 'member',
        //     name: 'Member',
        //     component: () => import('@/views/settings/member'),
        //     meta: {
        //       title: '帳號管理',
        //       icon: 'user'
        //     }
        //   },
        //   {
        //     path: 'role',
        //     name: 'Role',
        //     component: () => import('@/views/settings/role'),
        //     meta: {
        //       title: '角色管理',
        //       icon: 'user'
        //     }
        //   }
        // ]
      },
      {
        path: 'admissions',
        name: 'Admissions',
        component: () => import('@/views/settings/admissions'),
        meta: {
          title: '招生區間',
          icon: 'calendar'
        }
      },
      {
        path: 'name-list',
        name: 'NameList',
        component: () => import('@/views/settings/name-list'),
        meta: {
          title: '名單來源',
          icon: 'unordered-list'
        }
      },
      {
        path: 'activity',
        name: 'Activity',
        component: () => import('@/views/settings/activity'),
        meta: {
          title: '名單蒐集活動名稱',
          icon: 'project'
        }
      },
      {
        path: 'quit',
        name: 'Quit',
        component: () => import('@/views/settings/quit'),
        meta: {
          title: '退班原因',
          icon: 'user-delete'
        }
      },
      {
        path: 'sent-news',
        name: 'SentNews',
        component: () => import('@/views/settings/sent-news'),
        meta: {
          title: '發送簡訊',
          icon: 'message'
        }
      }
    ]
  }
]
