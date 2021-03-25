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
        :loading="loading"
        size="small"
      >
        <template slot="type" slot-scope="text">
          <span v-text="text === 'default' ? '預設' : '自訂'"></span>
        </template>
        <template slot="status" slot-scope="text">
          <a-tag :color="text ? 'green' : 'red'">{{ text ? '啟用' : '停用' }} </a-tag>
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
            <a-form-model-item label="名單來源" prop="listSource">
              <a-input v-model="form.listSource" />
            </a-form-model-item>
            <a-form-model-item label="聯絡天數" prop="contactCount">
              <a-input-number v-model="form.contactCount" :min="1" />
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
import { getResourceList } from '@/api/resource'
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
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        listSource: '',
        contactCount: undefined
      },
      dialog: {
        title: '',
        mode: '',
        visible: false
      },
      rules: {
        listSource: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        contactCount: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isEdit() {
      return this.dialog.mode === 'edit'
    }
  },
  created() {
    this.getResourceList()
  },
  methods: {
    async getResourceList() {
      this.loading = true
      try {
        const { data } = await getResourceList()
        this.tableData = data
      } catch (error) {
        // do nothing
      }
      this.loading = false
    },
    openDialog(mode, item) {
      this.dialog.visible = true
      this.dialog.mode = mode
      switch (mode) {
        case 'add':
          this.dialog.title = '新建'
          break
        case 'edit':
          this.dialog.title = '修改'
          Object.assign(this.form, item)
          break
        default:
          break
      }
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
    },
    resetForm() {
      return {
        listSource: '',
        contactCount: undefined
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
