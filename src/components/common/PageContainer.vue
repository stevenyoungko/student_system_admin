<template>
  <div class="page-container">
    <div v-if="this.$slots['query'] && this.$slots['query-action']" class="query-group">
      <div v-if="this.$slots['query']" class="query">
        <slot name="query"></slot>
      </div>
      <div v-if="this.$slots['query-action']" class="query-action">
        <slot name="query-action"></slot>
      </div>
    </div>
    <div v-if="this.$slots['control']" class="control">
      <slot name="controll"></slot>
    </div>
    <div v-if="this.$slots['content']" class="content">
      <slot name="content"></slot>
    </div>
    <div v-if="this.$slots['default']" class="default">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageContainer',
  mounted() {
    if (this.$slots.default) {
      console.warn('此不為預定的插槽，請確保你的插槽使用為正確的')
    }
  }
}
</script>

<style lang="less" scoped>
.page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: @white;
  * {
    background: @white;
    border-bottom-width: 1px solid @border-color;
  }
}

.query-group {
  position: relative;
  padding: 8px;
  display: flex;
  .query {
    flex: 1;
    -webkit-box-flex: 1;
    display: flex;
    margin-right: 10px;
  }
  .query-action {
    min-width: 80px;
  }
}
.default {
  background: @white;
}
</style>
