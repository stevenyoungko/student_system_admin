import request from '@/utils/request'

export const demoApiRequest = () => request({
  url: `/demo`,
  method: 'GET'
})
