export default [
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('@/layout/SlotLayout'),
    meta: {
      title: '展示用'
    },
    children: [
      {
        path: 'page1',
        name: 'Page1',
        component: () => import('@/layout/SlotLayout'),
        meta: {
          title: '展示用頁面列表'
        },
        children: [
          {
            path: 'demo1',
            name: 'Demo1',
            component: () => import('@/views/demo/index'),
            meta: {
              title: '頁面1'
            }
          }
        ]
      }
    ]
  }
]
