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
        row-key="id"
        size="small"
        :pagination="{pageSize:11}"
      >
        <template slot="type" slot-scope="text">
          <span v-text="text === 'default' ? '預設' : '自訂'"></span>
        </template>
        <template slot="status" slot-scope="text">
          <a-tag :color="text=== '1' ? 'green' : 'red'">{{ text === '1' ? '啟用' : '停用' }} </a-tag>
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
            <a-form-model-item v-if="isAdd" label="招生名稱" prop="recruit_name">
              <a-input v-model="form.recruit_name" />
            </a-form-model-item>
            <a-form-model-item v-if="isEdit && dialog.type === 'custom'" label="招生名稱" prop="recruit_name">
              <a-input v-model="form.recruit_name" />
            </a-form-model-item>
            <a-form-model-item v-if="isAdd" label="起迄时间" prop="dateRange">
              <a-range-picker
                v-model="form.dateRange"
                value-format="YYYY-MM-DD"
                :placeholder="['开始日期', '结束日期']"
              />
            </a-form-model-item>
            <a-form-model-item v-if="isEdit && dialog.type === 'custom'" label="起迄时间" prop="dateRange">
              <a-range-picker
                v-model="form.dateRange"
                value-format="YYYY-MM-DD"
                :placeholder="['开始日期', '结束日期']"
              />
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
import { getRecruitList, postRecruitItem, putRecruitItem } from '@/api/recruit'
import moment from 'moment'
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
      tableData: [],
      dialog: {
        title: '',
        mode: '',
        visible: false,
        id: '',
        type: ''
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        recruit_name: '',
        dateRange: ['', ''],
        status: ''
      },
      rules: {
        recruit_name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        dateRange: [
          { required: true, message: '必填', trigger: 'change' }
        ]
      },
      modalLoading: false,
      tableLoading: false
    }
  },
  computed: {
    isEdit() {
      return this.dialog.mode === 'edit'
    },
    isAdd() {
      return this.dialog.mode === 'add'
    }
  },
  created() {
    this.getRecruitList()
  },
  methods: {
    async getRecruitList() {
      this.tableLoading = true
      try {
        const { data } = await getRecruitList()
        this.tableData = data
      } catch (error) {
        // do nothing
      }
      this.tableLoading = false
    },
    openDialog(mode, item) {
      this.dialog.visible = true
      this.dialog.mode = mode
      const form = {
        recruit_name: '',
        status: '',
        dateRange: []
      }
      switch (mode) {
        case 'add':
          this.dialog.title = '新建'
          this.dialog.id = ''
          this.dialog.type = ''
          break
        case 'edit':
          this.dialog.title = '修改'
          this.dialog.id = item.id
          this.dialog.type = item.type
          form.recruit_name = item.recruit_name
          form.status = item.status === '1'
          form.dateRange[0] = moment(item.start_date)
          form.dateRange[1] = moment(item.end_date)
          Object.assign(this.form, form)
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
          await postRecruitItem({
            recruit_name: this.form.recruit_name,
            start_date: this.form.dateRange[0],
            end_date: this.form.dateRange[1]
          })
          this.$message.success('新增成功')
          this.modalLoading = false
          this.dialog.visible = false
          this.handleCancel()
          this.getRecruitList()
        } catch (error) {
          // do nothing
        }
      }
      if (this.dialog.mode === 'edit') {
        try {
          await this.$refs.ruleForm.validate()
          const form = {}
          if (this.dialog.type === 'default') {
            form.status = this.form.status
          }
          if (this.dialog.type === 'custom') {
            form.recruit_name = this.form.recruit_name
            form.start_date = moment(this.form.dateRange[0]).format('YYYY-MM-DD HH:mm:ss')
            form.end_date = moment(this.form.dateRange[1]).format('YYYY-MM-DD HH:mm:ss')
            form.status = this.form.status
          }
          await putRecruitItem(this.dialog.id, form)
          this.$message.success('更新成功')
          this.dialog.visible = false
          this.handleCancel()
          this.getRecruitList()
        } catch (error) {
          // do nothing
        }
      }
      this.modalLoading = false
    },
    resetForm() {
      return {
        recruit_name: '',
        dateRange: [],
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
