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
        row-key="id"
        :pagination="{pageSize:11}"
      >
        <template slot="status" slot-scope="text">
          <a-tag :color="text === '1' ? 'green' : 'red'">{{ text === '1' ? '啟用' : '停用' }} </a-tag>
        </template>
        <template slot="operation" slot-scope="text, record">
          <DefaultButton type="primary" text="修改" style="margin-right: 6px;" @click="openDialog('edit', record)" />
          <DefaultButton type="danger" text="刪除" style="margin-right: 6px;" />
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
            <a-form-model-item label="活動名稱" prop="activity_name">
              <a-input v-model="form.activity_name" />
            </a-form-model-item>
            <a-form-model-item label="活動地點" prop="activity_location">
              <a-input v-model="form.activity_location" />
            </a-form-model-item>
            <a-form-model-item v-if="isEdit" label="狀態" prop="status">
              <a-switch v-model="form.status" />
            </a-form-model-item>
            <a-form-model-item label="聯絡到期時間" prop="activity_date">
              <a-date-picker
                v-model="form.activity_date"
                placeholder="請選擇日期"
                style="width: 100%;"
                type="date"
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
import { getActivityList, postActivityItem, putActivityItem } from '@/api/activity'
export default {
  name: 'Activity',
  components: {
    PageContainer,
    DefaultButton,
    ScrollableDialogContainer
  },
  data() {
    const columns = [
      {
        title: '活動名稱',
        dataIndex: 'activity_name'
      },
      {
        title: '活動地點',
        dataIndex: 'activity_location'
      },
      {
        title: '建立者',
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
        title: '活動日期',
        dataIndex: 'activity_date'
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
        visible: false,
        mode: '',
        id: ''
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        activity_name: '',
        activity_location: '',
        activity_date: undefined,
        status: '0'
      },
      rules: {
        activity_name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        activity_location: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        activity_date: [
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
    }
  },
  created() {
    this.getActivityList()
  },
  methods: {
    async getActivityList() {
      this.tableLoading = true
      try {
        const { data } = await getActivityList()
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
          break
        case 'edit':
          this.dialog.title = '修改'
          this.dialog.id = item.id
          Object.assign(this.form, {
            activity_name: item.activity_name,
            activity_location: item.activity_location,
            status: item.status === '1',
            activity_date: moment(item.activity_date)
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
          await postActivityItem({
            activity_name: this.form.activity_name,
            activity_location: this.form.activity_location,
            activity_date: moment(this.form.activity_date).format('YYYY-MM-DD HH:mm:ss')
          })
          this.$message.success('新增成功')
          this.dialog.visible = false
          this.handleCancel()
          this.getActivityList()
        } catch (error) {
          // do nothing
        }
      }
      if (this.dialog.mode === 'edit') {
        try {
          await this.$refs.ruleForm.validate()
          await putActivityItem(this.dialog.id, {
            activity_name: this.form.activity_name,
            activity_location: this.form.activity_location,
            activity_date: moment(this.form.activity_date).format('YYYY-MM-DD HH:mm:ss'),
            status: this.form.status
          })
          this.$message.success('更新成功')
          this.dialog.visible = false
          this.handleCancel()
          this.getActivityList()
        } catch (error) {
          // do nothing
        }
      }
      this.modalLoading = false
    },
    resetForm() {
      return {
        activity_name: '',
        activity_location: '',
        activity_date: undefined,
        status: false
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
