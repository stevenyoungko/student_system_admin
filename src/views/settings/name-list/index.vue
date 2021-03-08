<template>
  <PageContainer>
    <template #control>
      <a-button type="primary" @click="openDialog('add')">新建</a-button>
    </template>
    <template #content>
      <a-table :columns="columns" :data-source="tableData" bordered>
        <template slot="operation">
          <div class="editable-row-operations">
            <DefaultButton type="primary" text="修改" style="margin-right: 6px;" />
            <DefaultButton type="danger" text="停用" style="margin-right: 6px;" />
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
            <a-form-model-item label="名單來源" prop="listSource">
              <a-input v-model="form.listSource" />
            </a-form-model-item>
            <a-form-model-item label="聯絡天數" prop="contactCount">
              <a-input-number v-model="form.contactCount" :min="1" />
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
        dataIndex: 'listSource'
      },
      {
        title: '聯絡天數',
        dataIndex: 'contactCount'
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
      tableData: [
        {
          listSource: 'Fb',
          contactCount: 5
        }
      ],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        listSource: '',
        contactCount: ''
      },
      dialog: {
        title: '',
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
