<template>
  <PageContainer>
    <template #control>
      <a-button type="primary" @click="openDialog('add')">新建</a-button>
    </template>
    <template #content>
      <a-table :columns="columns" :data-source="data" bordered>
        <template slot="permission" slot-scope="text">
          <span v-text="text ? '總部' : '全體'"></span>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <DefaultButton type="primary" text="修改權限" style="margin-right: 6px;" @click="openDialog('edit', record)" />
            <DefaultButton type="warning" text="回復原始設定" style="margin-right: 6px;" />
          </div>
        </template>
      </a-table>
    </template>
    <template #default>
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
            <a-form-model-item label="權限" prop="permission">
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
        title: '帳號',
        dataIndex: 'account'
      },
      {
        title: '密碼',
        dataIndex: 'password'
      },
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '權限',
        dataIndex: 'permission',
        scopedSlots: { customRender: 'permission' }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '25%',
        scopedSlots: { customRender: 'operation' }
      }
    ]

    const data = []
    for (let i = 1; i < 11; i++) {
      data.push({
        account: `account ${i}`,
        password: `password ${i}`,
        name: `Steven ${i}`,
        permission: 1
      })
    }
    return {
      columns,
      data,
      dialog: {
        title: '',
        visible: false
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
  methods: {
    openDialog(mode, item) {
      this.dialog.visible = true
      switch (mode) {
        case 'add':
          this.dialog.title = '新建'
          break
        case 'edit':
          this.dialog.title = '修改權限'
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
