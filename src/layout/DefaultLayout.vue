<template>
  <a-layout class="layout beauty-scroll">
    <LayoutBodySider :collapsed="collapsed" :collapsible="true" />
    <a-layout class="layout-body">
      <LayoutHeader :collapsed="collapsed" @toggleCollapse="toggleCollapse" />
      <div class="layout-body-content beauty-scroll">
        <TagsView />
        <AppMain />
      </div>
    </a-layout>
  </a-layout>
</template>

<script>
import LayoutHeader from './components/header/index'
import LayoutBodySider from './components/sider/index'
import TagsView from './components/tagsView/index'
import AppMain from './components/AppMain/index'

export default {
  name: 'DefaultLayout',
  components: {
    LayoutHeader,
    LayoutBodySider,
    TagsView,
    AppMain
  },
  data() {
    return {
      collapsed: false
    }
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="less">
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &-body {
    display: flex;
    flex: 1;
    &-content {
      flex: 1;
      padding: 6px;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
