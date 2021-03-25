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
        size="small"
        :pagination="{pageSize:11}"
      >
        <template slot="status" slot-scope="text">
          <a-tag :color="text ? 'green' : 'red'">{{ text ? '啟用' : '停用' }} </a-tag>
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
            <a-form-model-item label="活動名稱" prop="name">
              <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item label="活動地點" prop="address">
              <a-input v-model="form.address" />
            </a-form-model-item>
            <a-form-model-item v-if="isEdit" label="狀態" prop="status">
              <a-switch v-model="form.status" />
            </a-form-model-item>
            <a-form-model-item label="聯絡到期時間" prop="date">
              <a-date-picker
                v-model="form.date"
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
        dataIndex: 'name'
      },
      {
        title: '活動地點',
        dataIndex: 'address'
      },
      {
        title: '建立者',
        dataIndex: 'accountName'
      },
      {
        title: '教學中心',
        dataIndex: 'branch'
      },
      {
        title: '狀態',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '活動日期',
        dataIndex: 'date'
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
          name: '活動一',
          address: '101大樓',
          accountName: 'Steven',
          branch: '總部',
          status: true,
          date: '2021-6-5'
        },
        {
          name: '活動二',
          address: '松菸',
          accountName: 'Sean',
          branch: '分部',
          status: false,
          date: '2021-10-5'
        }
      ],
      dialog: {
        title: '',
        visible: false,
        mode: ''
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        address: '',
        date: undefined,
        status: false
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        date: [
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
  methods: {
    openDialog(mode, item) {
      this.dialog.visible = true
      this.dialog.mode = mode
      switch (mode) {
        case 'add':
          this.dialog.title = '新建'
          break
        case 'edit':
          this.dialog.title = '修改'
          Object.assign(this.form, {
            name: item.name,
            address: item.address,
            status: item.status,
            date: moment(item.date)
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
        name: '',
        address: '',
        date: undefined
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
