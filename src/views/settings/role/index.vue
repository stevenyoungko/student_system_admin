<template>
  <PageContainer>
    <template #control>
      <a-button type="primary" @click="openDialog('add')">新建</a-button>
    </template>
    <template #content>
      <a-table :columns="columns" :data-source="tableData" bordered>
        <template slot="operation">
          <div class="editable-row-operations">
            <DefaultButton type="primary" text="編輯" style="margin-right: 6px;" />
            <DefaultButton type="danger" text="刪除" style="margin-right: 6px;" />
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
            <a-form-model-item ref="name" label="角色名稱" prop="name">
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
  name: 'Role',
  components: {
    PageContainer,
    DefaultButton,
    ScrollableDialogContainer
  },
  data() {
    const columns = [
      {
        title: '角色名稱',
        dataIndex: 'role',
        width: '50%'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '50%',
        scopedSlots: { customRender: 'operation' }
      }
    ]
    return {
      columns,
      tableData: [
        {
          role: '管理者'
        },
        {
          role: '一般使用者'
        }
      ],
      dialog: {
        title: '',
        visible: false
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: ''
      },
      rules: {
        account: [
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
