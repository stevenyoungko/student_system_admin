import request from '@/utils/request'

export const getActivityList = () => request({
  url: '/api/activity/list',
  method: 'GET'
})
