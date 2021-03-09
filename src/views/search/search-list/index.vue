<template>
  <PageContainer>
    <template #control>
      <DefaultButton type="primary" text="匯出excel" style="margin-right: 6px;" />
      <DefaultButton type="danger" text="停用" style="margin-right: 6px;" />
      <DefaultButton type="primary" text="設定群組" style="margin-right: 6px;" />
    </template>
    <template #query>
      <QueryContainer>
        <template #priority>
          <a-form-model-item label="學員姓名">
            <a-input v-model="form.name" placeholder="請學員姓名" />
          </a-form-model-item>
          <a-form-model-item label="電話號碼">
            <a-input v-model="form.phone" placeholder="請電話號碼" />
          </a-form-model-item>
          <a-form-model-item label="名單來源">
            <a-select v-model="form.listSource" placeholder="請選擇名單來源" style="width: 180px;">
              <a-select-option value="shanghai">
                後台
              </a-select-option>
              <a-select-option value="beijing">
                官網
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </template>
        <template>
          <a-form-model-item label="名單類型">
            <a-checkbox-group v-model="form.listType">
              <a-checkbox value="1" name="type">
                不限
              </a-checkbox>
              <a-checkbox value="2" name="type">
                有效名單
              </a-checkbox>
              <a-checkbox value="3" name="type">
                潛力名單
              </a-checkbox>
              <a-checkbox value="3" name="type">
                在學生
              </a-checkbox>
              <a-checkbox value="3" name="type">
                退班生
              </a-checkbox>
              <a-checkbox value="3" name="type">
                結業生
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
          <a-form-model-item label="招生區間">
            <a-select v-model="form.admissionsRange" placeholder="請選擇招生區間" style="width: 180px;">
              <a-select-option value="1">
                不限
              </a-select-option>
              <a-select-option value="2">
                2019年春季招生
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="日期區間">
            <a-range-picker
              v-model="form.dateRange"
              value-format="YYYY-MM-DD"
              :placeholder="['开始日期', '结束日期']"
            />
          </a-form-model-item>
          <a-form-model-item label="生日區間">
            <a-range-picker
              v-model="form.dateRange"
              value-format="YYYY-MM-DD"
              :placeholder="['开始日期', '结束日期']"
            />
          </a-form-model-item>
          <a-form-model-item label="群組">
            <a-select v-model="form.group" placeholder="請選擇群組" style="width: 180px;">
              <a-select-option value="1">
                不限
              </a-select-option>
              <a-select-option value="2">
                後台設定群組
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="活動名稱">
            <a-select v-model="form.activity" placeholder="請選擇活動名稱" style="width: 180px;">
              <a-select-option value="1">
                不限
              </a-select-option>
              <a-select-option value="2">
                後台設定的活動
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="年齡">
            <a-select v-model="form.age" placeholder="請選擇年齡" style="width: 180px;">
              <a-select-option value="1">
                未足齡
              </a-select-option>
              <a-select-option value="2">
                樂樂班
              </a-select-option>
              <a-select-option value="3">
                幼兒班
              </a-select-option>
              <a-select-option value="4">
                國小以上
              </a-select-option>
              <a-select-option value="5">
                16歲以上
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </template>
      </QueryContainer>
    </template>
    <template #query-action>
      <a-button icon="search">查詢</a-button>
    </template>
    <template #content>
      <a-table
        :columns="columns"
        :data-source="tableData"
        bordered
        :scroll="{ x: 3250, y: 300 }"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <template slot="operation">
          <div class="editable-row-operations">
            <DefaultButton type="primary" text="編輯" style="margin-right: 6px;" />
            <DefaultButton type="primary" text="詳細資料" style="margin-right: 6px;" />
          </div>
        </template>
      </a-table>
    </template>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/container/PageContainer'
import QueryContainer from '@/components/container/QueryContainer'
import DefaultButton from '@/components/button/DefaultButton'
export default {
  name: 'SearchList',
  components: {
    PageContainer,
    QueryContainer,
    DefaultButton
  },
  data() {
    const columns = [
      {
        title: '預約編號',
        dataIndex: 'appointment',
        width: 150,
        fixed: 'left'
      },
      {
        title: '填寫日期',
        dataIndex: 'writeDate',
        width: 100
      },
      {
        title: '名單來源',
        dataIndex: 'listSource',
        width: 100
      },
      {
        title: '家長姓名',
        dataIndex: 'parentName',
        width: 100
      },
      {
        title: '小朋友姓名',
        dataIndex: 'childName',
        width: 100
      },
      {
        title: '小朋友生日',
        dataIndex: 'birthday',
        width: 100
      },
      {
        title: '小朋友性別',
        dataIndex: 'gender',
        width: 100
      },
      {
        title: '行動電話',
        dataIndex: 'cellphone',
        width: 100
      },
      {
        title: '連絡電話',
        dataIndex: 'phone',
        width: 100
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 100
      },
      {
        title: '電子信箱',
        dataIndex: 'email',
        width: 100
      },
      {
        title: '消息來源',
        dataIndex: 'newsSource',
        width: 100
      },
      {
        title: '教學中心',
        dataIndex: 'teachCenter',
        width: 100
      },
      {
        title: '名單類型',
        dataIndex: 'listType',
        width: 100
      },
      {
        title: '符合班別',
        dataIndex: 'class',
        width: 100
      },
      {
        title: '方便聯繫時段',
        dataIndex: 'contact',
        width: 100
      },
      {
        title: '兄弟姊妹',
        dataIndex: 'sibling',
        width: 100
      },
      {
        title: '接洽人',
        dataIndex: 'contactPerson',
        width: 100
      },
      {
        title: '就學經驗',
        dataIndex: 'experience',
        width: 100
      },
      {
        title: '孩子個性',
        dataIndex: 'personality',
        width: 100
      },
      {
        title: '音樂課程經驗',
        dataIndex: 'musicExperience',
        width: 100
      },
      {
        title: '其他課程經驗',
        dataIndex: 'otherExperience',
        width: 100
      },
      {
        title: '主要照顧者',
        dataIndex: 'caregiver',
        width: 100
      },
      {
        title: '期望上課時段',
        dataIndex: 'classTime',
        width: 100
      },
      {
        title: '備註',
        dataIndex: 'remark',
        width: 100
      },
      {
        title: '結論',
        dataIndex: 'conclustion',
        width: 100
      },
      {
        title: '回覆狀況',
        dataIndex: 'reply',
        width: 100
      },
      {
        title: '預約狀況',
        dataIndex: 'reservation',
        width: 100
      },
      {
        title: '報到狀況',
        dataIndex: 'report',
        width: 100
      },
      {
        title: '報名狀況',
        dataIndex: 'register',
        width: 100
      },
      {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        width: 200,
        scopedSlots: { customRender: 'operation' }
      }
    ]
    return {
      form: {
        name: '',
        phone: '',
        listSource: undefined,
        listType: ['1'],
        admissionsRange: '1',
        dateRange: [],
        birthdayRange: [],
        group: '1',
        activity: '1',
        age: '1'
      },
      columns,
      tableData: [
        {
          appointment: '1080910063653',
          writeDate: '123',
          listSource: '123',
          parentName: '123',
          childName: '123',
          birthday: '123',
          gender: '123',
          cellphone: '123',
          phone: '123',
          address: '123',
          email: '123',
          newsSource: '123',
          teachCenter: '123',
          listType: '123',
          class: '123',
          contact: '123',
          sibling: '123',
          contactPerson: '123',
          experience: '123',
          personality: '123',
          musicExperience: '123',
          otherExperience: '123',
          caregiver: '123',
          classTime: '123',
          remark: '123',
          conclustion: '123',
          reply: '123',
          reservation: '123',
          report: '123',
          register: '123'
        }
      ],
      selectedRowKeys: []
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style lang="less" scoped>

</style>
