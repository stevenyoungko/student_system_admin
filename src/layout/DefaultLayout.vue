<template>
  <a-layout class="layout">
    <LayoutBodySider :collapsed="collapsed" :collapsible="true" />
    <a-layout class="layout-body">
      <LayoutHeader :collapsed="collapsed" @toggleCollapse="toggleCollapse" />
      <div class="layout-body-content">
        <router-view />
      </div>
    </a-layout>
  </a-layout>
</template>

<script>
import LayoutHeader from '@/components/layout/DefaultLayoutHeader'
import LayoutBodySider from '@/components/layout/DefaultLayoutSider'

export default {
  name: 'DefaultLayout',
  components: {
    LayoutHeader,
    LayoutBodySider
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
  background-color:#888888;
  display: flex;
  flex-direction: column;
  height: 100vh;

  &-body {
    display: flex;
    flex: 1;
    overflow-y: auto;

    &-content {
      flex: 1;
      background-color: #f0f2f5;
      padding: 0 12px;
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
