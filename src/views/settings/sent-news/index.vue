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
        size="small"
        :pagination="{pageSize:11}"
      >
        <template slot="status" slot-scope="text">
          <a-tag :color="text ? 'green' : 'red'">{{ text ? '啟用' : '停用' }} </a-tag>
        </template>
        <template slot="operation" slot-scope="text, record">
          <DefaultButton type="primary" text="簡訊發送" style="margin-right: 6px;" />
          <DefaultButton type="primary" text="修改" style="margin-right: 6px;" @click="openDialog('edit', record)" />
          <DefaultButton type="primary" text="詳細" style="margin-right: 6px;" />
          <DefaultButton type="danger" text="刪除" />
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
            <a-form-model-item v-if="isEdit" label="狀態" prop="status">
              <a-switch v-model="form.status" />
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
import { getGroupList } from '@/api/group'
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
        dataIndex: 'group_name'
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
      tableData: [],
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        groupName: '',
        created_at: ''
      },
      dialog: {
        title: '',
        mode: '',
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
  computed: {
    isEdit() {
      return this.dialog.mode === 'edit'
    }
  },
  created() {
    this.getGroupList()
  },
  methods: {
    async getGroupList() {
      this.loading = true
      try {
        const { data } = await getGroupList()
        this.tableData = data
      } catch {
        // do nothing
      }
      this.loading = false
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
          Object.assign(this.form, {
            groupName: item.groupName,
            status: item.status,
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
