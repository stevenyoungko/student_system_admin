export default [
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/layout/SlotLayout'),
    meta: {
      title: '搜尋',
      icon: 'search'
    },
    children: [
      {
        path: 'search-list',
        name: 'SearchList',
        component: () => import('@/views/search/search-list'),
        meta: {
          title: '名單搜尋',
          icon: 'search'
        }
      }
    ]
  }
]
