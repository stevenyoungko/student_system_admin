<template>
  <PageContainer>
    <template #content>
      <a-table
        :columns="columns"
        :data-source="tableData"
        bordered
        :loading="tableLoading"
        row-key="id"
        size="small"
        :pagination="{pageSize:11}"
      >
        <template slot="level" slot-scope="text">
          <span v-text="text ? '總部' : '教學中心' "></span>
        </template>
        <template slot="status" slot-scope="text">
          <a-tag :color="text === '1' ? 'green' : 'red'">{{ text === '1' ? '啟用' : '停用' }} </a-tag>
        </template>
        <template slot="operation" slot-scope="text, record">
          <DefaultButton type="primary" text="修改" @click="openDialog(record)" />
        </template>
      </a-table>
    </template>
    <template>
      <a-modal
        v-model="dialog.visible"
        :title="dialog.title"
        :mask-closable="false"
        cancel-text="取消"
        ok-text="提交"
        :confirm-loading="modalLoading"
        :width="600"
        @ok="submit"
        @cancel="handleCancel"
      >
        <ScrollableDialogContainer>
          <a-form-model
            ref="ruleForm"
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="權限">
              <a-checkbox-group v-model="form.authorities">
                <div v-for="authority in authorityList" :key="authority.id">
                  <h3>{{ authority.name }}</h3>
                  <a-checkbox
                    v-for="(child, index) in authority.children"
                    :key="index"
                    :value="child.id"
                    style="margin-bottom: 12px;"
                  >
                    {{ child.name }}
                  </a-checkbox>
                </div>
              </a-checkbox-group>
            </a-form-model-item>
            <a-form-model-item label="狀態">
              <a-switch v-model="form.status" />
            </a-form-model-item>
          </a-form-model>
        </ScrollableDialogContainer>
      </a-modal>
    </template>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/container/PageContainer'
import DefaultButton from '@/components/button/DefaultButton'
import ScrollableDialogContainer from '@/components/dialog/ScrollableDialogContainer'
import { getBranchList } from '@/api/branch'
import { getAuthorityList, getAuthorityItem, putActivityItem } from '@/api/authority'
export default {
  name: 'Permission',
  components: {
    PageContainer,
    DefaultButton,
    ScrollableDialogContainer
  },
  data() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '教學中心代號',
        dataIndex: 'branch_id'
      },
      {
        title: '教學中心名稱',
        dataIndex: 'branch_name'
      },
      {
        title: '層級',
        dataIndex: 'level',
        scopedSlots: { customRender: 'level' }
      },
      {
        title: '狀態',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }
    ]

    return {
      columns,
      tableData: [],
      dialog: {
        title: '',
        visible: false,
        id: ''
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: {
        authorities: [],
        status: ''
      },
      modalLoading: false,
      tableLoading: false,
      authorityList: []
    }
  },
  created() {
    this.getBranchList()
    this.getAuthorityList()
  },
  methods: {
    async getBranchList() {
      this.tableLoading = true
      try {
        const { data } = await getBranchList()
        this.tableData = data
      } catch {
        // do nothing
      }
      this.tableLoading = false
    },
    async getAuthorityList() {
      try {
        const { data } = await getAuthorityList()
        this.authorityList = data
      } catch (error) {
        // do nothing
      }
    },
    async getAuthorityItem(id) {
      this.tableLoading = true
      try {
        const { data } = await getAuthorityItem(id)
        this.tableLoading = false
        return data
      } catch (error) {
        // do nothing
      }
    },
    async openDialog(item) {
      const data = await this.getAuthorityItem(item.id)
      this.dialog.visible = true
      this.dialog.title = '修改'
      this.dialog.id = item.id
      Object.assign(this.form, {
        authorities: data.authorities,
        status: item.status === '1'
      })
    },
    async submit() {
      this.modalLoading = true
      try {
        await putActivityItem(this.dialog.id, {
          authorities: this.form.authorities,
          status: this.form.status
        })
        this.$message.success('更新成功')
        this.dialog.visible = false
        this.handleCancel()
        this.getBranchList()
      } catch (error) {
        // do nothing
      }
      this.modalLoading = false
    },
    handleCancel() {
      Object.assign(this.form, this.resetForm())
    },
    resetForm() {
      return {
        authorities: [],
        status: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
