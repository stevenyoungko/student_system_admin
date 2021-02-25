<template>
  <div class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews" :max="8">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  watch: {
    $route: {
      handler(route) {
        // keep-alive 驗證
        if (process.env.NODE_ENV !== 'development') return
        if (route.meta && !route.meta.noTagViews) {
          if ((route.meta && route.meta.noCache) && !route.matched[route.matched.length - 1].components.default.name) {
            console.warn(`[${route.path}]\nLayout下的views 請設置 component name\n如不需要cache 請設置router.meta.noCache`)
          }
          if (route.name !== route.matched[route.matched.length - 1].components.default.name) {
            console.error(`[${route.path}]\nLayout下的views component name 請與 router nameㄧ致,\n如不需要cache 請設置router.meta.noCache`)
          }
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.app-main {
  height: calc(100% - 40px);
  position: relative;
  padding: 0;
  overflow-x: auto;
  margin-top: -16px;
  margin-left: -10px;
  background: @white;
}
</style>
