<template>
  <PageContainer>
    <template #control>
      <a-button type="primary" @click="openDialog('add')">新建</a-button>
    </template>
    <template #content>
      <a-table
        :columns="columns"
        :data-source="tableData"
        bordered
        :loading="tableLoading"
        size="small"
        row-key="id"
      >
        <template slot="type" slot-scope="text">
          <span v-text="text === 'default' ? '自訂' : '活動'"></span>
        </template>
        <template slot="status" slot-scope="text">
          <a-tag :color="text === '1' ? 'green' : 'red'">{{ text === '1' ? '啟用' : '停用' }} </a-tag>
        </template>
        <template slot="operation" slot-scope="text, record">
          <DefaultButton type="primary" text="修改" style="margin-right: 6px;" @click="openDialog('edit', record)" />
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
            <a-form-model-item v-if="isAdd" label="名單來源" prop="list_resource_name">
              <a-input v-model="form.list_resource_name" />
            </a-form-model-item>
            <a-form-model-item v-if="isEdit && dialog.type === 'default'" label="名單來源" prop="list_resource_name">
              <a-input v-model="form.list_resource_name" />
            </a-form-model-item>
            <a-form-model-item label="聯絡天數" prop="due_days">
              <a-input-number v-model="form.due_days" :min="1" />
            </a-form-model-item>
            <a-form-model-item v-if="isEdit" label="狀態" prop="status">
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
import { getResourceList, postResourceItem, putResourceItem } from '@/api/resource'
export default {
  name: 'NameList',
  components: {
    PageContainer,
    DefaultButton,
    ScrollableDialogContainer
  },
  data() {
    const columns = [
      {
        title: '名單來源',
        dataIndex: 'list_resource_name'
      },
      {
        title: '聯絡天數',
        dataIndex: 'due_days'
      },
      {
        title: '教學中心',
        dataIndex: 'branch_name'
      },
      {
        title: '類型',
        dataIndex: 'type',
        scopedSlots: { customRender: 'type' }
      },
      {
        title: '狀態',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '建立者',
        dataIndex: 'account_name'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '20%',
        scopedSlots: { customRender: 'operation' }
      }
    ]
    return {
      columns,
      tableData: [],
      modalLoading: false,
      tableLoading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        list_resource_name: '',
        due_days: undefined,
        status: ''
      },
      dialog: {
        title: '',
        mode: '',
        visible: false,
        id: '',
        type: ''
      },
      rules: {
        list_resource_name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        due_days: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isEdit() {
      return this.dialog.mode === 'edit'
    },
    isAdd() {
      return this.dialog.mode === 'add'
    }
  },
  created() {
    this.getResourceList()
  },
  methods: {
    async getResourceList() {
      this.tableLoading = true
      try {
        const { data } = await getResourceList()
        this.tableData = data
      } catch (error) {
        // do nothing
      }
      this.tableLoading = false
    },
    openDialog(mode, item) {
      this.dialog.visible = true
      this.dialog.mode = mode
      switch (mode) {
        case 'add':
          this.dialog.title = '新建'
          this.dialog.id = ''
          this.dialog.type = ''
          break
        case 'edit':
          this.dialog.title = '修改'
          this.dialog.id = item.id
          this.dialog.type = item.type
          Object.assign(this.form, {
            list_resource_name: item.list_resource_name,
            due_days: item.due_days,
            status: item.status === '1'
          })
          break
        default:
          break
      }
    },
    async submit() {
      this.modalLoading = true
      if (this.dialog.mode === 'add') {
        try {
          await this.$refs.ruleForm.validate()
          await postResourceItem({
            list_resource_name: this.form.list_resource_name,
            due_days: this.form.due_days
          })
          this.$message.success('新增成功')
          this.dialog.visible = false
          this.handleCancel()
          this.getResourceList()
        } catch (error) {
          // do nothing
        }
      }
      if (this.dialog.mode === 'edit') {
        try {
          await this.$refs.ruleForm.validate()
          const form = {}
          if (this.dialog.type === 'default') {
            form.list_resource_name = this.form.list_resource_name
            form.due_days = this.form.due_days
            form.status = this.form.status
          }
          if (this.dialog.type === 'activity') {
            form.due_days = this.form.due_days
            form.status = this.form.status
          }
          await putResourceItem(this.dialog.id, form)
          this.$message.success('更新成功')
          this.dialog.visible = false
          this.handleCancel()
          this.getResourceList()
        } catch (error) {
          // do nothing
        }
      }
      this.modalLoading = false
    },
    resetForm() {
      return {
        list_resource_name: '',
        due_days: undefined,
        status: ''
      }
    },
    handleCancel() {
      this.$refs.ruleForm.resetFields()
      Object.assign(this.form, this.resetForm())
    }
  }
}
</script>

<style lang="less" scoped>

</style>
