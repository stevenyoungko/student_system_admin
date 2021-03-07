<template>
  <PageContainer>
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
          <!-- <a-form-model-item label="Activity time">
            <a-date-picker
              v-model="form.date1"
              show-time
              type="date"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </a-form-model-item>
          <a-form-model-item label="Instant delivery">
            <a-switch v-model="form.delivery" />
          </a-form-model-item> -->
        </template>
        <template>
          <a-form-model-item ref="dateRange" label="日期區間">
            <a-range-picker
              v-model="form.dateRange"
              value-format="YYYY-MM-DD"
              :placeholder="['开始日期', '结束日期']"
            />
          </a-form-model-item>
          <a-form-model-item ref="birthdayRange" label="生日區間">
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
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/container/PageContainer'
import QueryContainer from '@/components/container/QueryContainer'
export default {
  name: 'SearchList',
  components: {
    PageContainer,
    QueryContainer
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        listSource: undefined,
        listType: '1',
        admissionsRange: '1',
        dateRange: [],
        birthdayRange: [],
        group: '1',
        activity: '1',
        age: '1'
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
