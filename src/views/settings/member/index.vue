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
        :pagination="{pageSize:11}"
        row-key="id"
      >
        <template slot="status" slot-scope="text">
          <a-tag :color="text === '1' ? 'green' : 'red'">{{ text === '1' ? '啟用' : '停用' }} </a-tag>
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
            <a-form-model-item label="帳號" prop="account">
              <a-input v-model="form.account" />
            </a-form-model-item>
            <a-form-model-item label="密碼" prop="password">
              <a-input v-model="form.password" />
            </a-form-model-item>
            <a-form-model-item label="姓名" prop="account_name">
              <a-input v-model="form.account_name" />
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
import { getMemberList, postMemeber, putMemberItem } from '@/api/member'
import { validateNormalPassword, validateAccount } from '@/utils/validate'

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
    // const passwordValidator = (rule, value, cb) => {
    //   if (!validateNormalPassword(value)) {
    //     cb(new Error('长度：6~20 限制符号：半形、英文、数字（不含空白）'))
    //   } else {
    //     cb()
    //   }
    // }
    // const accountValidator = (rule, value, cb) => {
    //   if (!validateAccount(value)) {
    //     cb(new Error('长度：6~20 限制符号：半形、英文、数字、底线（不含空白）'))
    //   } else {
    //     cb()
    //   }
    // }
    return {
      columns,
      tableData: [],
      tableLoading: false,
      modalLoading: false,
      dialog: {
        title: '',
        visible: false,
        mode: '',
        id: ''
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        account: '',
        password: '',
        account_name: '',
        status: ''
      },
      rules: {
        account: [
          { required: true, trigger: 'blur', message: '必填' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '必填' }
        ],
        account_name: [
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
    this.getMemberList()
  },
  methods: {
    async getMemberList() {
      this.tableLoading = true
      try {
        const { data } = await getMemberList()
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
          break
        case 'edit':
          this.dialog.title = '修改'
          this.dialog.id = item.id
          Object.assign(this.form, {
            account: item.account,
            account_name: item.account_name,
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
          await postMemeber(this.dialog.id, {
            account: this.form.account,
            password: this.form.password,
            account_name: this.form.account_name
          })
          this.$message.success('新增成功')
          this.dialog.visible = false
          this.handleCancel()
          this.getMemberList()
        } catch (error) {
        // do nothing
        }
      }
      if (this.dialog.mode === 'edit') {
        try {
          await putMemberItem(this.dialog.id, {
            account: this.form.account,
            password: this.form.password,
            account_name: this.form.account_name,
            status: this.form.status
          })
          this.$message.success('更新成功')
          this.dialog.visible = false
          this.handleCancel()
          this.getMemberList()
        } catch (error) {
          // do nothing
        }
      }
      this.modalLoading = false
    },
    resetForm() {
      return {
        account: '',
        password: '',
        account_name: '',
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
