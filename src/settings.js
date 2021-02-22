module.exports = {
  /**
   * @type {Number}
   * @description 變更開發port 這邊權重是最小的 process.env.port > process.env.npm_config_port > settings.port
   * 如果port被佔住 mock server port會對不到 請注意
   */
  port: 6866,
  /**
   * @type {String}
   * @description 變更document.title & 登入頁標題
   */
  title: 'CASE ADMIN',
  /**
   * @type {string}
   * @description 登入頁副標題
   */
  subTitle: '專案後台系統',
  /**
   * @type {string}
   * @description set TokenKey in LocalStorage Detail Check @/utils/auth.js
   */
  accessTokenKey: 'token'
}
