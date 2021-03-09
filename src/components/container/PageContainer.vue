<template>
  <div class="page-container">
    <div v-if="this.$slots['query-control']" class="control">
      <slot name="query-control"></slot>
    </div>
    <div v-if="this.$slots['query'] && this.$slots['query-action']" :class="['query-group', this.$slots['control'] ? 'no-bottom-border' : '']">
      <div v-if="this.$slots['query']" class="query">
        <slot name="query"></slot>
      </div>
      <div v-if="this.$slots['query-action']" class="query-action">
        <slot name="query-action"></slot>
      </div>
    </div>
    <div v-if="this.$slots['control']" class="control">
      <slot name="control"></slot>
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
      console.warn('[PageContainer] default slot 為非預留插槽，請確保你的插槽使用正確')
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
  width: calc(100vw - 280px);
  > div:not(.default), .default > .default-content {
    position: relative;
    background: @white;
    padding: 8px;
    border-bottom: 1px solid @border-color;
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
    padding-top: 8px;
    display: flex;
    flex-direction: column;
    /deep/ button{
      margin-bottom: 4px;
    }
  }
}

.no-bottom-border {
  border-bottom: 0 !important;
}
</style>
