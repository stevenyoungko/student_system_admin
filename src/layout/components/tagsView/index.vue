<template>
  <a-tabs v-model="activePage" class="tab-container" type="card" @change="tabChange">
    <a-tab-pane v-for="view in visitedViews" :key="view.name">
      <div slot="tab" class="tab">
        <div class="title">{{ view.title }}</div>
        <a-icon type="close" class="icon-close" />
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TagsView',
  data() {
    return {
      activePage: ''
    }
  },
  computed: {
    ...mapState('tagsView', ['visitedViews'])
  },
  watch: {
    $route: {
      handler(route) {
        this.addTags()
        this.setCurrentTag(route.name)
      }
    }
  },
  created() {
    this.addTags()
    this.setCurrentTag(this.$route.name)
  },
  methods: {
    addTags() {
      const { name, meta } = this.$route
      if (name && meta && !meta.noTagViews) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
    },
    setCurrentTag(key) {
      this.activePage = key
    },
    tabChange(activeKey) {
      this.setCurrentTag(activeKey)
      this.$router.push({ name: activeKey })
    }
  }
}
</script>

<style scoped lang="less">
.tab-container {
  // margin-top: -16px;
  .tab{
    margin: 0 -16px;
    padding: 0 16px;
    font-size: 14px;
    user-select: none;
    transition: all 0.2s;
    .title{
      display: inline-block;
      height: 100%;
    }
    .icon-close{
      font-size: 12px;
      margin-left: 6px;
      margin-right: -4px !important;
      color: rgba(0, 0, 0, 0.45);
      &:hover {
        color: rgba(0, 0, 0, 0.65)
      }
    }
  }
}
</style>

