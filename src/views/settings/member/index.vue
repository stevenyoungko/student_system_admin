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
      >
        <template slot="status" slot-scope="text">
          <a-tag :color="text ? 'green' : 'red'">{{ text ? '啟用' : '停用' }} </a-tag>
        </template>
        <template slot="operation" slot-scope="text, record">
          <DefaultButton type="primary" text="修改" style="margin-right: 6px;" @click="openDialog('edit', record)" />
          <DefaultButton type="warning" text="停用" style="margin-right: 6px;" />
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
            <a-form-model-item label="帳號" prop="account">
              <a-input v-model="form.account" />
            </a-form-model-item>
            <a-form-model-item label="密碼" prop="password">
              <a-input v-model="form.password" />
            </a-form-model-item>
            <a-form-model-item label="姓名" prop="name">
              <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item v-if="isEdit" label="狀態" prop="status">
              <a-switch v-model="form.status" />
            </a-form-model-item>
            <a-form-model-item v-if="isAdd" label="權限" prop="permission">
              <a-radio-group v-model="form.permission">
                <a-radio :value="1">
                  總部
                </a-radio>
                <a-radio :value="0">
                  全體
                </a-radio>
              </a-radio-group>
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
import { getMemberList } from '@/api/member'
export default {
  name: 'Member',
  components: {
    PageContainer,
    DefaultButton,
    ScrollableDialogContainer
  },
  data() {
    const columns = [
      {
        title: '帳號',
        dataIndex: 'account'
      },
      {
        title: '姓名',
        dataIndex: 'account_name'
      },
      {
        title: '教學中心',
        dataIndex: 'branch_name'
      },
      {
        title: '狀態',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '25%',
        scopedSlots: { customRender: 'operation' }
      }
    ]
    return {
      columns,
      tableData: [],
      loading: false,
      dialog: {
        title: '',
        visible: false,
        mode: ''
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        account: '',
        password: '',
        name: '',
        permission: 1
      },
      rules: {
        account: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isAdd() {
      return this.dialog.mode === 'add'
    },
    isEdit() {
      return this.dialog.mode === 'edit'
    }
  },
  created() {
    this.getMemberList()
  },
  methods: {
    async getMemberList() {
      this.loading = true
      try {
        const { data } = await getMemberList()
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
        account: '',
        password: '',
        name: '',
        permission: 1
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
