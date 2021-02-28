<template>
  <header class="layout-header">
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapse" />
    <div class="layout-header__right">
      <a-dropdown :trigger="['click']">
        <div class="header-avatar" style="cursor: pointer">
          <a-avatar class="avatar" size="small" shape="circle" src="https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png" />
          <span class="name">使用者名稱</span>
        </div>
        <a-menu slot="overlay" @click="selectItem">
          <a-menu-item key="personal">
            <a-icon type="user" />
            <span>个人中心</span>
          </a-menu-item>
          <a-menu-item key="setting">
            <a-icon type="setting" />
            <span>设置</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="logout">
            <a-icon style="margin-right: 8px;" type="poweroff" />
            <span>退出登录</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: 'LayoutHeader',
  props: {
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    toggleCollapse() {
      this.$emit('toggleCollapse')
    },
    selectItem(e) {
      switch (e.key) {
        case 'logout':
          this.logout()
          break

        default:
          break
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('user/logout')
        this.$router.push({ name: 'Login' })
      } catch (error) {
        // 登出錯誤
      }
    }
  }
}
</script>

<style lang="less">
.layout-header {
  height: 64px;
  background-color:@white;
  box-shadow: 0 2px 8px rgba(0,0,0, 0.15);
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  &__right {
    display: flex;
    width: 300px;
    justify-content: flex-end;

    .header-avatar {
      padding: 0 12px;
      align-self: center;
      display: inline-flex;
      box-sizing: border-box;
      line-height: 64px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.025);
      }

      .avatar {
        align-self: center;
        margin-right: 8px;
      }

      .name {
        font-weight: 500;
      }
    }
  }
}
.trigger {
  font-size: 20px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
  &:hover{
    color: @primary-hover;
  }
}
</style>
