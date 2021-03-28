import request from '@/utils/request'

export const getActivityList = () => request({
  url: '/api/activity/list',
  method: 'GET'
})

export const postActivityItem = (data) => request({
  url: '/api/activity/new',
  method: 'POST',
  data
})

export const putActivityItem = (id, data) => request({
  url: `/api/activity/${id}`,
  method: 'PUT',
  data
})
