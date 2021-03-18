<template>
  <PageContainer>
    <template #control>
      <a-button type="primary" @click="openDialog('add')">新建</a-button>
    </template>
    <template #content>
      <a-table :columns="columns" :data-source="tableData" bordered>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <DefaultButton type="primary" text="簡訊發送" style="margin-right: 6px;" />
            <DefaultButton type="primary" text="修改" style="margin-right: 6px;" @click="openDialog('edit', record)" />
            <DefaultButton type="primary" text="詳細" style="margin-right: 6px;" />
            <DefaultButton type="danger" text="刪除" style="margin-right: 6px;" />
          </div>
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
            <a-form-model-item label="群組名稱" prop="groupName">
              <a-input v-model="form.groupName" placeholder="請輸入群組名稱" />
            </a-form-model-item>
            <a-form-model-item label="建立時間" prop="created_at">
              <a-date-picker
                v-model="form.created_at"
                placeholder="請選擇建立時間"
                style="width: 100%;"
              />
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
import moment from 'moment'
export default {
  name: 'SentNews',
  components: {
    PageContainer,
    DefaultButton,
    ScrollableDialogContainer
  },
  data() {
    const columns = [
      {
        title: '群組名稱',
        dataIndex: 'groupName'
      },
      {
        title: '建立者',
        dataIndex: 'accountName'
      },
      {
        title: '建立時間',
        dataIndex: 'created_at'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '30%',
        scopedSlots: { customRender: 'operation' }
      }
    ]
    return {
      columns,
      tableData: [
        {
          groupName: '群組名稱',
          accountName: 'Steven',
          created_at: '2021-03-08'
        }
      ],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        groupName: '',
        created_at: ''
      },
      dialog: {
        title: '',
        visible: false
      },
      rules: {
        groupName: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        created_at: [
          { required: true, message: '必填', trigger: 'change' }
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
          this.dialog.title = '修改'
          Object.assign(this.form, {
            groupName: item.groupName,
            created_at: moment(item.created_at)
          })
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
        groupName: '',
        created_at: ''
      }
    },
    handleCancel() {
      this.$refs.ruleForm.resetFields()
      Object.assign(this.form, this.resetForm())
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
