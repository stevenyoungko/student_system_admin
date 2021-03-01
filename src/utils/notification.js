import { Notification } from 'ant-design-vue'
import { Message } from 'ant-design-vue'
// 全局配置
Notification.config({
  duration: 3
})
Message.config({
  duration: 3,
  maxCount: 5
})

export const notify = (type = 'open', config = {
  message: '展示用通知標題',
  description: '展示用通知內文內文內文內文內文內文內文內文'
}) => {
  switch (type) {
    // antd 預設的通知類型
    case 'success':
    case 'error':
    case 'info':
    case 'warn':
    case 'warning':
      Notification[type](config)
      break
    case 'close':
      if (!config.key) {
        console.warn(`[Notify] 沒有傳入作為識別的 key 值 :${config.key}，無法關閉對應的通知`)
        break
      }
      Notification.close(config.key)
      break
    case 'close-all':
      Notification.destroy()
      break
    // 自定義的通知
    case 'open':
    case 'custom':
      Notification['open'](config)
      break
    default:
      console.warn(`[Notify] 沒有傳入任何類型 type : ${type}，請檢查是否正確傳入`)
      break
  }
}

export const message = (type = 'open', config = {
  content: 'A message occurs'
}) => {
  switch (type) {
    // antd 預設的通知類型
    case 'success':
    case 'error':
    case 'info':
    case 'warn':
    case 'warning':
    case 'loading':
      Message[type](config)
      break
    case 'close-all':
      Message.destroy()
      break
    // 自定義的訊息
    case 'open':
    case 'custom':
      Message['open'](config)
      break
    default:
      console.warn(`[Message] 沒有傳入任何類型 type : ${type}，請檢查是否正確傳入`)
      break
  }
}
