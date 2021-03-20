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
        path: 'member',
        name: 'Member',
        component: () => import('@/views/settings/member'),
        meta: {
          title: '會員設定',
          icon: 'lock'
        }
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
          title: '名單活動',
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
          title: '群組',
          icon: 'message'
        }
      }
    ]
  }
]
