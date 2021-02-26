<template>
  <a-tabs v-model="activePage" class="tab-container" type="card">
    <a-tab-pane v-for="view in visitedViews" :key="view.path">
      <div slot="tab" class="tab">
        <div class="title" @click="onTabClick(view)">{{ view.title }}</div>
        <a-icon type="close" class="icon-close" @click.stop="closeTag(view)" />
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
        this.setCurrentTag(this.$route)
      }
    }
  },
  created() {
    this.addTags()
    this.setCurrentTag(this.$route)
  },
  mounted() {
    window.tag = this
  },
  methods: {
    ...mapActions('tagsView', [
      'addView',
      'delView'
    ]),
    isCurrentTag(view) {
      return view.path === this.$route.path
    },
    addTags() {
      const { name, meta } = this.$route
      if (name && meta && !meta.noTagViews) {
        this.addView(this.$route)
      }
    },
    setCurrentTag(view) {
      this.activePage = view.path
      for (const view of this.visitedViews) {
        if (view.path === this.$route.path) {
          // when query is different then update
          if (view.fullPath !== this.$route.fullPath) {
            this.$store.dispatch('tagsView/updateVisitedView', this.$route)
          }
          break
        }
      }
    },
    onTabClick(view) {
      this.setCurrentTag(view)
      this.$router.push(view.path)
    },
    closeTag(view) {
      this.delView(view).then(({ visitedViews }) => {
        if (this.isCurrentTag(view)) {
          this.moveToLastTag(visitedViews, view)
        }
      })
    },
    moveToLastTag(visitedViews, view) {
      const lastView = visitedViews.slice(-1)[0]
      if (lastView) {
        this.$router.push(lastView.path)
      } else {
        if (view.name === 'Dashboard') {
          this.$router.replace({ path: `/redirect${view.fullPath}` })
        } else {
          this.$router.push('/')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.tab-container {
  padding-left: 16px;
  min-height: 56px;
  .tab{
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

