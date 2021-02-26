<template>
  <a-form-model class="query-container" v-bind="$attrs">
    <template v-if="hasPriority">
      <a-button class="query-container__collapseBtn" :icon="isCollapse ? 'caret-down' : 'caret-up'" @click="handleCollapse" />
      <div class="query-container__priority">
        <slot name="priority"></slot>
      </div>
    </template>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div v-show="!isCollapse" class="query-container__optional">
        <slot></slot>
      </div>
    </transition>
  </a-form-model>
</template>

<script>
import { addClass, removeClass } from '@/utils/dom'
const elementUiCollapseHooks = {
  beforeEnter(el) {
    console.log('el', el)
    addClass(el, 'collapse-transition')
    if (!el.dataset) el.dataset = {}

    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom

    el.style.height = '0'
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  },
  enter(el) {
    console.log('el.scrollHeight', el.scrollHeight)
    el.dataset.oldOverflow = el.style.overflow
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    } else {
      el.style.height = ''
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }

    el.style.overflow = 'hidden'
  },
  afterEnter(el) {
    // for safari: remove class then reset height is necessary
    removeClass(el, 'collapse-transition')
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
  },
  beforeLeave(el) {
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow

    el.style.height = el.scrollHeight + 'px'
    el.style.overflow = 'hidden'
  },
  leave(el) {
    if (el.scrollHeight !== 0) {
      // for safari: add class after set height, or it will jump to zero height suddenly, weired
      addClass(el, 'collapse-transition')
      el.style.height = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    }
  },
  afterLeave(el) {
    removeClass(el, 'collapse-transition')
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  }
}
export default {
  name: 'QueryContainer',
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    hasPriority() {
      return this.$slots.priority && this.$slots.priority.length > 0
    }
  },
  mounted() {
    if (this.hasPriority && !this.$slots.default) {
      console.warn('有優先展示的查詢組件，沒有次要展示組件，請檢查是否有需要放置優先展示的 slot。')
    }
  },
  methods: {
    ...elementUiCollapseHooks,
    handleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.query-container {
  position: relative;
  width: 100%;
  padding-right: 36px;
  & /deep/ .ant-form-item {
    margin: 4px;
    background-color: @Light-80;
    padding: 0 12px;
    border-radius: 4px;
    // for required label to position from ant-form-item
    .ant-form-item-label, .ant-form-item-required {
      position: static;
    }
    .ant-form-item-required:before {
        position: absolute;
        top: -4px;
        left: -4px;
        content: '必填';
        font-size: 12px;
        line-height: 1;
        padding: 2px 4px;
        border-radius: 4px;
        color: #fff;
        background-color: @Danger;
        z-index: 2;
    }
  }
  &__priority {
    display: flex;
  }
  &__collapseBtn {
      position: absolute;
      right: 4px;
      top: 8px;
      // width: 30px;
      // height: 30px;
      /deep/ i {
        vertical-align: baseline;
      }
  }
  &__optional {
    display: flex;
  }
}
</style>
