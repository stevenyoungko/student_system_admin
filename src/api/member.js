import request from '@/utils/request'

export const getMemberList = () => request({
  url: '/api/member/list',
  method: 'GET'
})

export const postMemeber = (data) => request({
  url: '/api/member/new',
  method: 'POST',
  data
})

export const putMemberItem = (id, data) => request({
  url: `/api/member/${id}`,
  method: 'PUT',
  data
})
