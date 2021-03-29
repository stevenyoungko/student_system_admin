import request from '@/utils/request'

export const getClassList = () => request({
  url: '/api/class/list',
  method: 'GET'
})

export const getCityList = () => request({
  url: '/api/city/list',
  method: 'GET'
})

export const getRegionList = (id) => request({
  url: `/api/region/list/${id}`,
  method: 'GET'
})
