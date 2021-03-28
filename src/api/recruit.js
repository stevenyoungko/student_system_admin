import request from '@/utils/request'

export const getRecruitList = () => request({
  url: '/api/recruit/list',
  method: 'GET'
})

export const postRecruitItem = (data) => request({
  url: '/api/recruit/new',
  method: 'POST',
  data
})

export const putRecruitItem = (id, data) => request({
  url: `/api/recruit/${id}`,
  method: 'PUT',
  data
})
