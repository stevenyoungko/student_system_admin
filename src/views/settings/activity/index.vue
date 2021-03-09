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
            <a-form-model-item ref="name" label="活動名稱" prop="name">
              <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item ref="address" label="活動地點" prop="address">
              <a-input v-model="form.address" />
            </a-form-model-item>
            <a-form-model-item ref="endDate" label="聯絡到期時間" prop="endDate">
              <a-date-picker
                v-model="form.endDate"
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
        title: '聯絡到期時間',
        dataIndex: 'endDate'
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
          endDate: '2021-6-31'
        },
        {
          name: '活動二',
          address: '松菸',
          endDate: '2021-10-31'
        }
      ],
      dialog: {
        title: '',
        visible: false
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        address: '',
        endDate: ''
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        endDate: [
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

<style lang="scss" scoped>

</style>
