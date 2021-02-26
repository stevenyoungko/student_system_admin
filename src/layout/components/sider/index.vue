<template>
  <a-layout-sider v-model="collapsed" :class="['side-menu']" :trigger="null" width="256px" :collapsible="collapsible">
    <div :class="['logo']">
      <router-link to="/dashboard">
        <img src="@/assets/img/logo.png">
        <h1>{{ systemTitle }}</h1>
      </router-link>
    </div>
    <a-menu
      style="padding: 16px 0;"
      mode="inline"
      theme="dark"
      :selected-keys="selectedKeys"
      :open-keys.sync="openKeys"
      @click="handleMenuItemClick"
    >
      <template v-for="(route) in routeMenu">
        <a-menu-item v-if="!route.children" :key="route.name">
          <a-icon :type="route.meta.icon || 'file'" />
          <span>{{ route.meta.title || '沒對應到' }}</span>
        </a-menu-item>
        <sub-menu v-else :key="route.name" :menu-info="route" />
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { constantRoutes } from '@/router'
import settings from '@/settings'
import SubMenu from './SubMenu'
import fastEqual from 'fast-deep-equal'
export default {
  name: 'LayoutBodySider',
  components: {
    SubMenu
  },
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      routeMenu: [],
      cachedOpenKeys: [],
      selectedKeys: [],
      openKeys: []
    }
  },
  computed: {
    systemTitle() {
      return settings.title
    }
  },
  watch: {
    $route() {
      this.updateMenu()
    },
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    }
  },
  created() {
    this.routeMenu = constantRoutes.find(item => item.path === '/').children
    this.updateMenu()
  },
  mounted() {
    window.fastEqual = fastEqual
  },
  methods: {
    updateMenu() {
      this.selectedKeys = this.getSelectedKeys(this.$route)
      const openKeys = this.getOpenKeysByRoute()
      if (!fastEqual(openKeys, this.openKeys)) {
        this.collapsed ? this.cachedOpenKeys = openKeys : this.openKeys = openKeys
      }
    },
    handleMenuItemClick({ key }) {
      this.$router.push({ name: key })
    },
    getOpenKeysByRoute() {
      const matchStrings = this.$route.fullPath.match(/\/\w*(?=\/)/g)
      if (!matchStrings) return []

      const getSubPathTitles = paths => paths.map(string => string.slice(1).charAt(0).toUpperCase() + string.slice(2))
      return getSubPathTitles(matchStrings)
    },
    getSelectedKeys() {
      return [this.$route.name]
    }
  }
}
</script>

<style lang="less">
.side-menu{
  min-height: 100vh;
  overflow-y: auto;
  z-index: 10;
  .logo{
    height: 64px;
    position: relative;
    line-height: 64px;
    padding-left: 24px;
    -webkit-transition: all .3s;
    transition: all .3s;
    overflow: hidden;
    background-color: @sideBar-logo;
    h1{
      color: #fff;
      font-size: 20px;
      margin: 0 0 0 12px;
      display: inline-block;
      vertical-align: middle;
    }
    img{
      width: 32px;
      vertical-align: middle;
    }
  }
}
</style>
