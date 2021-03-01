<template>
  <div class="dialog-container__content beauty-scroll" :style="{'max-height': contentHeight}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ScrollableDialogContainer',
  props: {
    contentHeight: {
      type: String,
      default: '55vh'
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-container__content {
  padding: 16px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
