<template functional>
  <a-sub-menu :key="props.menuInfo.name" v-on="listeners">
    <span slot="title">
      <a-icon :type="props.menuInfo.meta.icon || 'folder-open'" />
      <span>{{ props.menuInfo.meta.title || '沒對應到' }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.name">
        <a-icon :type="item.meta.icon || 'file'" />
        {{ item.meta.title || '沒對應到' }}
      </a-menu-item>
      <sub-menu v-else :key="item.name" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from 'ant-design-vue'
export default {
  name: 'SubMenu',
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
