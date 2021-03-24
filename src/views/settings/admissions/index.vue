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
        row-key="id"
      >
        <template slot="type" slot-scope="text">
          <span v-text="text === 'default' ? '預設' : '自訂'"></span>
        </template>
        <template slot="status" slot-scope="text">
          <a-tag :color="text ? 'green' : 'red'">{{ text ? '啟用' : '停用' }} </a-tag>
        </template>
        <template slot="operation" slot-scope="text, record">
          <DefaultButton type="primary" text="修改" style="margin-right: 6px;" @click="openDialog('edit', record)" />
          <DefaultButton type="danger" text="停用" style="margin-right: 6px;" />
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
            <a-form-model-item label="招生名稱" prop="title">
              <a-input v-model="form.title" />
            </a-form-model-item>
            <a-form-model-item v-if="isEdit" label="狀態" prop="status">
              <a-switch v-model="form.status" />
            </a-form-model-item>
            <a-form-model-item label="起迄时间" prop="dateRange">
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
import { getRecruitList } from '@/api/recruit'
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
        dataIndex: 'recruit_name'
      },
      {
        title: '類型',
        dataIndex: 'type',
        scopedSlots: { customRender: 'type' }
      },
      {
        title: '建立者',
        dataIndex: 'account_name'
      },
      {
        title: '教學中心名稱',
        dataIndex: 'branch_name'
      },
      {
        title: '狀態',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '起始時間',
        dataIndex: 'start_date'
      },
      {
        title: '結束時間',
        dataIndex: 'end_date'
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
          accountName: 'Steven',
          branch: '總部',
          status: true,
          start_at: '2019-01-01',
          end_at: '2019-03-01'
        },
        {
          title: '2018秋季招生',
          accountName: 'Sean',
          branch: '分部',
          status: false,
          start_at: '2019-06-01',
          end_at: '2019-9-01'
        }
      ],
      dialog: {
        title: '',
        mode: '',
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
  computed: {
    isEdit() {
      return this.dialog.mode === 'edit'
    }
  },
  created() {
    this.getRecruitList()
  },
  methods: {
    async getRecruitList() {
      this.loading = true
      try {
        const { data } = await getRecruitList()
        this.tableData = data
      } catch (error) {
        // do nothing
      }
      this.loading = false
    },
    openDialog(mode, item) {
      this.dialog.visible = true
      this.dialog.mode = mode
      const form = {
        title: '',
        dateRange: []
      }
      switch (mode) {
        case 'add':
          this.dialog.title = '新建'
          break
        case 'edit':
          this.dialog.title = '修改'
          form.title = item.title
          form.status = item.status
          form.dateRange[0] = item.start_at
          form.dateRange[1] = item.end_at
          Object.assign(this.form, form)
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
        title: '',
        dateRange: []
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
