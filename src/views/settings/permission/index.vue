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
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="權限" prop="authority_category">
              <template v-for="authority in authorityList">
                <a-checkbox-group :key="authority.name" v-model="form.authority_category">
                  <a-checkbox
                    v-for="(child, index) in authority.children"
                    :key="index"
                    :value="child.id"
                  >
                    {{ child.name }}
                  </a-checkbox>
                </a-checkbox-group>
              </template>
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
import { getAuthorityList } from '@/api/authority'
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
        title: '更新時間',
        dataIndex: 'update_time'
      },
      {
        title: '建立時間',
        dataIndex: 'create_time'
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
        visible: false
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: {
        authority_category: [],
        status: ''
      },
      rules: {
      },
      // categroyList: [
      //   { name: '招生區間', value: 1 },
      //   { name: '名單來源', value: 2 },
      //   { name: '名單活動', value: 3 },
      //   { name: '退班原因', value: 4 },
      //   { name: '批量上傳', value: 5 }
      // ],
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
    handleCancel() {
      this.$refs.ruleForm.resetFields()
      Object.assign(this.form, this.resetForm())
    },
    openDialog(item) {
      this.dialog.visible = true
      this.dialog.title = '修改'
      Object.assign(this.form, {
        authority_category: item.authority_category,
        status: item.status
      })
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.dialog.visible = false
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
