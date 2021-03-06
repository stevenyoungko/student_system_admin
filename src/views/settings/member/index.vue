<template>
  <PageContainer>
    <template #control>
      <a-button type="primary" @click="openDialog('add')">新建</a-button>
    </template>
    <template #content>
      <a-table :columns="columns" :data-source="data" bordered>
        <template slot="operation">
          <div class="editable-row-operations">
            <DefaultButton type="primary" text="編輯" size="small" style="margin-right: 6px;" />
            <DefaultButton type="primary" text="修改權限" size="small" style="margin-right: 6px;" />
            <DefaultButton type="warning" text="回復原始設定" size="small" style="margin-right: 6px;" />
          </div>
        </template>
      </a-table>
    </template>
    <template #default>
      <a-modal
        v-model="dialog.visible"
        :title="dialog.title"
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
            <a-form-model-item ref="name" label="帳號" prop="account">
              <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item ref="password" label="密碼" prop="password">
              <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item ref="name" label="姓名" prop="name">
              <a-input v-model="form.name" />
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
        dataIndex: 'account',
        width: '25%'
      },
      {
        title: '密碼',
        dataIndex: 'password',
        width: '25%'
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '25%'
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
        name: `Steven ${i}`
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
        name: ''
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
    openDialog(mode) {
      this.dialog.visible = true
      switch (mode) {
        case 'add':
          this.dialog.title = '新建'
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
    handleCancel() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
