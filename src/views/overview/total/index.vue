<template>
  <PageContainer>
    <template #content>
      <a-card
        class="card"
        title="名單概況"
      >
        <a-list item-layout="horizontal" :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta>
              <span slot="title">
                <span class="list-title">{{ item.title }}</span>
                <span>5筆</span>
              </span>
            </a-list-item-meta>
            <DefaultButton
              slot="actions"
              type="primary"
              text="查看"
              @click.native="showDetail(item.path)"
            />
          </a-list-item>
        </a-list>
      </a-card>
    </template>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/container/PageContainer'
import DefaultButton from '@/components/button/DefaultButton'
export default {
  name: 'TotalList',
  components: {
    PageContainer,
    DefaultButton
  },
  data() {
    return {
      data: [
        {
          title: '已到期名單:',
          path: 'expired-list'
        },
        {
          title: '兩天後到期名單:',
          path: 'two-days-list'
        },
        {
          title: '未回覆名單:',
          path: 'unanswer-list'
        },
        {
          title: '官網後台名單:',
          path: 'official-list'
        }
      ]
    }
  },
  methods: {
    showDetail(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-card-head {
  background: #FAFAFA;
}
.list-title {
  font-size: 16px;
  margin-right: 16px;
}
</style>
