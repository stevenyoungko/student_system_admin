const defaultSettings = require('./src/settings.js')

const name = defaultSettings.title || 'case-admin'
const port = process.env.PORT || defaultSettings.port || 6866
const NODE_ENV = process.env.NODE_ENV
const apiProxyTarget = process.env.VUE_APP_TARGET_API // api 跳板目標，視情況新增同類型變數

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

console.log('專案名稱 : ', name)
console.log('專案環境 : ', NODE_ENV)
console.log('當前 apiProxyTarget 為: ', apiProxyTarget)

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: apiProxyTarget,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
