export default [
  {
    path: '/overview',
    name: 'Overview',
    component: () => import('@/layout/SlotLayout'),
    meta: {
      title: '總覽',
      icon: 'cluster'
    },
    children: [
      {
        path: 'total-list',
        name: 'TotalList',
        component: () => import('@/views/overview/total'),
        meta: {
          title: '名單總覽',
          icon: 'unordered-list'
        }
      },
      {
        path: 'expired-list',
        name: 'ExpiredList',
        component: () => import('@/views/overview/expired'),
        meta: {
          title: '已到期名單',
          icon: 'unordered-list'
        }
      },
      {
        path: 'two-days-list',
        name: 'TwodaysList',
        component: () => import('@/views/overview/two-days'),
        meta: {
          title: '兩天後到期名單',
          icon: 'unordered-list'
        }
      },
      {
        path: 'unanswer-list',
        name: 'UnanswerList',
        component: () => import('@/views/overview/unanswer'),
        meta: {
          title: '未回覆名單',
          icon: 'unordered-list'
        }
      },
      {
        path: 'official-list',
        name: 'OfficialList',
        component: () => import('@/views/overview/official'),
        meta: {
          title: '官網後台名單',
          icon: 'unordered-list'
        }
      }
    ]
  }
]
