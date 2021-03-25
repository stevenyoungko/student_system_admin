<template>
  <PageContainer>
    <template #content>
      <a-table
        :columns="columns"
        :data-source="tableData"
        bordered
        :loading="loading"
        row-key="id"
        size="small"
        :pagination="{pageSize:11}"
      >
        <template slot="level" slot-scope="text">
          <span v-text="text ? '總部' : '教學中心' "></span>
        </template>
        <template slot="status" slot-scope="text">
          <a-tag :color="text ? 'green' : 'red'">{{ text ? '啟用' : '停用' }} </a-tag>
        </template>
        <template slot="operation" slot-scope="text, record">
          <DefaultButton type="primary" text="修改" @click="openDialog(record)" />
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
        :width="600"
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
            <a-form-model-item label="權限" prop="authority_category">
              <a-checkbox-group v-model="form.authority_category">
                <a-checkbox
                  v-for="(category, index) in categroyList"
                  :key="index"
                  :value="category.value"
                >
                  {{ category.name }}
                </a-checkbox>
              </a-checkbox-group>
            </a-form-model-item>
            <a-form-model-item label="狀態">
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
import { getBranchList } from '@/api/branch'
export default {
  name: 'Permission',
  components: {
    PageContainer,
    DefaultButton,
    ScrollableDialogContainer
  },
  data() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '教學中心代號',
        dataIndex: 'branch_id'
      },
      {
        title: '教學中心名稱',
        dataIndex: 'branch_name'
      },
      {
        title: '層級',
        dataIndex: 'level',
        scopedSlots: { customRender: 'level' }
      },
      {
        title: '狀態',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '更新時間',
        dataIndex: 'update_time'
      },
      {
        title: '建立時間',
        dataIndex: 'create_time'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }
    ]

    return {
      columns,
      tableData: [],
      dialog: {
        title: '',
        visible: false
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: {
        authority_category: [],
        status: ''
      },
      rules: {
      },
      categroyList: [
        { name: '招生區間', value: 1 },
        { name: '名單來源', value: 2 },
        { name: '名單活動', value: 3 },
        { name: '退班原因', value: 4 }
      ],
      loading: false
    }
  },
  created() {
    this.getBranchList()
  },
  methods: {
    async getBranchList() {
      this.loading = true
      try {
        const { data } = await getBranchList()
        this.tableData = data
      } catch {
        // do nothing
      }
      this.loading = false
    },
    handleCancel() {
      this.$refs.ruleForm.resetFields()
      Object.assign(this.form, this.resetForm())
    },
    openDialog(item) {
      this.dialog.visible = true
      this.dialog.title = '修改'
      Object.assign(this.form, {
        authority_category: item.authority_category,
        status: item.status
      })
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
