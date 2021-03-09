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
            <a-form-model-item ref="title" label="招生名稱" prop="title">
              <a-input v-model="form.title" />
            </a-form-model-item>
            <a-form-model-item ref="dateRange" label="起迄时间" prop="dateRange">
              <a-range-picker
                v-model="form.dateRange"
                value-format="YYYY-MM-DD"
                :placeholder="['开始日期', '结束日期']"
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
export default {
  name: 'Admissions',
  components: {
    PageContainer,
    DefaultButton,
    ScrollableDialogContainer
  },
  data() {
    const columns = [
      {
        title: '招生名稱',
        dataIndex: 'title'
      },
      {
        title: '起始時間',
        dataIndex: 'start_at'
      },
      {
        title: '結束時間',
        dataIndex: 'end_at'
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
          title: '2019春季招生',
          start_at: '2019-01-01',
          end_at: '2019-03-01'
        },
        {
          title: '2018秋季招生',
          start_at: '2019-06-01',
          end_at: '2019-9-01'
        }
      ],
      dialog: {
        title: '',
        visible: false
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        title: '',
        dateRange: []
      },
      rules: {
        title: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        dateRange: [
          { required: true, message: '必填', trigger: 'change' }
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
