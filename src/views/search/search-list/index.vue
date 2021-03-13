<template>
  <PageContainer>
    <template #query-control>
      <a-form-model
        layout="inline"
        :model="form"
      >
        <a-form-model-item label="課程類型" style="margin-bottom: 0;">
          <a-select v-model="form.course" style="width: 150px;" placeholder="請選擇課程類型">
            <a-select-option value="child">
              兒童課程
            </a-select-option>
            <a-select-option value="adult">
              成人課程
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </template>
    <template #query>
      <QueryContainer>
        <template #priority>
          <a-form-model-item label="學員姓名">
            <a-input v-model="query.name" placeholder="請學員姓名" />
          </a-form-model-item>
          <a-form-model-item label="電話號碼">
            <a-input v-model="query.phone" placeholder="請電話號碼" />
          </a-form-model-item>
          <a-form-model-item label="名單來源">
            <a-select v-model="query.listSource" placeholder="請選擇名單來源" style="width: 180px;">
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
            <a-checkbox-group v-model="query.listType">
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
            <a-select v-model="query.admissionsRange" placeholder="請選擇招生區間" style="width: 180px;">
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
              v-model="query.dateRange"
              value-format="YYYY-MM-DD"
              :placeholder="['开始日期', '结束日期']"
            />
          </a-form-model-item>
          <a-form-model-item label="生日區間">
            <a-range-picker
              v-model="query.dateRange"
              value-format="YYYY-MM-DD"
              :placeholder="['开始日期', '结束日期']"
            />
          </a-form-model-item>
          <a-form-model-item label="群組">
            <a-select v-model="query.group" placeholder="請選擇群組" style="width: 180px;">
              <a-select-option value="1">
                不限
              </a-select-option>
              <a-select-option value="2">
                後台設定群組
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="活動名稱">
            <a-select v-model="query.activity" placeholder="請選擇活動名稱" style="width: 180px;">
              <a-select-option value="1">
                不限
              </a-select-option>
              <a-select-option value="2">
                後台設定的活動
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="年齡">
            <a-select v-model="query.age" placeholder="請選擇年齡" style="width: 180px;">
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
    <template #control>
      <DefaultButton type="primary" text="匯出excel" style="margin-right: 6px;" />
      <DefaultButton type="danger" text="停用" style="margin-right: 6px;" />
      <DefaultButton type="primary" text="設定群組" style="margin-right: 6px;" @click="showSetting" />
    </template>
    <template #content>
      <a-table
        :columns="columns"
        :data-source="tableData"
        bordered
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <template slot="crm" slot-scope="text">
          <a-icon v-if="text" type="check-circle" :style="{color: '#53C519'}" />
        </template>
        <template slot="reply" slot-scope="text">
          <span :style="{ color: text ? 'red' : ''}" v-text="text ? '未回覆' : '已回覆'"></span>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <DefaultButton type="primary" text="詳細資料" style="margin-right: 6px;" @click="showDetail(record)" />
          </div>
        </template>
      </a-table>
    </template>
    <template #default>
      <DetailDialog
        :data="detailDialog.data"
        :show-modal.sync="detailDialog.show"
      />
      <SettingDialog
        :selected-row-keys="selectedRowKeys"
        :show-modal.sync="settingDialog.show"
      />
    </template>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/container/PageContainer'
import QueryContainer from '@/components/container/QueryContainer'
import DefaultButton from '@/components/button/DefaultButton'
import DetailDialog from './components/DetailDialog'
import SettingDialog from './components/SettingDialog'
export default {
  name: 'SearchList',
  components: {
    PageContainer,
    QueryContainer,
    DefaultButton,
    DetailDialog,
    SettingDialog
  },
  data() {
    const columns = [
      {
        title: '小朋友姓名',
        dataIndex: 'childName'
      },
      {
        title: '小朋友生日',
        dataIndex: 'birthday'
      },
      {
        title: '結論',
        dataIndex: 'conclustion'
      },
      {
        title: '方便聯繫時段',
        dataIndex: 'contact'
      },
      {
        title: '消息來源',
        dataIndex: 'newsSource'
      },
      {
        title: '填寫日期',
        dataIndex: 'writeDate'
      },
      {
        title: '追蹤碼',
        dataIndex: 'trackCode'
      },
      {
        title: '轉拋CRM',
        dataIndex: 'crm',
        align: 'center',
        scopedSlots: { customRender: 'crm' }
      },
      {
        title: '回覆狀況',
        dataIndex: 'reply',
        scopedSlots: { customRender: 'reply' }
      },
      {
        title: '預約狀況',
        dataIndex: 'reservation'
      },
      {
        title: '報到狀況',
        dataIndex: 'report'
      },
      {
        title: '報名狀況',
        dataIndex: 'register'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }
    ]
    return {
      query: {
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
      form: {
        course: undefined
      },
      columns,
      tableData: [
        {
          childName: '123',
          birthday: '',
          contact: '1',
          newsSource: '1',
          writeDate: '2021-03-12',
          trackCode: '123123',
          crm: 1,
          appointment: '1080910063653',
          listSource: '123',
          parentName: '123',
          gender: '男',
          cellphone: '0928376453',
          phone: '0228736473',
          address: '123',
          email: '123',
          teachCenter: '1',
          listType: '1',
          class: '1',
          sibling: '兄',
          contactPerson: '爸爸',
          experience: '無',
          personality: '活潑',
          musicExperience: '無',
          otherExperience: '無',
          caregiver: '爸爸',
          classTime: '早上',
          remark: '無',
          conclustion: '無',
          reply: '1',
          reservation: '1',
          report: '1',
          register: '1'
        },
        {
          childName: '123',
          birthday: '',
          contact: '1',
          newsSource: '1',
          writeDate: '2021-03-12',
          trackCode: '123123',
          crm: 1,
          appointment: '1080910063653',
          listSource: '123',
          parentName: '123',
          gender: '男',
          cellphone: '0928376453',
          phone: '0228736473',
          address: '123',
          email: '123',
          teachCenter: '1',
          listType: '1',
          class: '1',
          sibling: '兄',
          contactPerson: '爸爸',
          experience: '無',
          personality: '活潑',
          musicExperience: '無',
          otherExperience: '無',
          caregiver: '爸爸',
          classTime: '早上',
          remark: '無',
          conclustion: '無',
          reply: '1',
          reservation: '1',
          report: '1',
          register: '1'
        },
        {
          childName: '123',
          birthday: '',
          contact: '1',
          newsSource: '1',
          writeDate: '2021-03-12',
          trackCode: '123123',
          crm: 1,
          appointment: '1080910063653',
          listSource: '123',
          parentName: '123',
          gender: '男',
          cellphone: '0928376453',
          phone: '0228736473',
          address: '123',
          email: '123',
          teachCenter: '1',
          listType: '1',
          class: '1',
          sibling: '兄',
          contactPerson: '爸爸',
          experience: '無',
          personality: '活潑',
          musicExperience: '無',
          otherExperience: '無',
          caregiver: '爸爸',
          classTime: '早上',
          remark: '無',
          conclustion: '無',
          reply: '1',
          reservation: '1',
          report: '1',
          register: '1'
        }
      ],
      selectedRowKeys: [],
      detailDialog: {
        show: false,
        data: {}
      },
      settingDialog: {
        show: false
      }
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    showDetail(item) {
      this.detailDialog.show = true
      this.detailDialog.data = item
    },
    showSetting() {
      this.settingDialog.show = true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
