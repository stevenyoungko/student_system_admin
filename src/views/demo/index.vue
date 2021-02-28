<template>
  <PageContainer>
    <template #query>
      <QueryContainer>
        <template #priority>
          <a-form-model-item label="Activity name">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="Activity zone">
            <a-select v-model="form.region" placeholder="please select your zone" style="width: 180px;">
              <a-select-option value="shanghai">
                Zone one
              </a-select-option>
              <a-select-option value="beijing">
                Zone two
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="Activity time">
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
          </a-form-model-item>
        </template>
        <template>
          <a-form-model-item label="Activity type">
            <a-checkbox-group v-model="form.type">
              <a-checkbox value="1" name="type">
                Online
              </a-checkbox>
              <a-checkbox value="2" name="type">
                Promotion
              </a-checkbox>
              <a-checkbox value="3" name="type">
                Offline
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
          <a-form-model-item label="Resources">
            <a-radio-group v-model="form.resource">
              <a-radio value="1">
                Sponsor
              </a-radio>
              <a-radio value="2">
                Venue
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="Activity form">
            <a-input v-model="form.desc" type="textarea" />
          </a-form-model-item>
        </template>
      </QueryContainer>
    </template>
    <template #query-action>
      <a-button icon="search">查詢</a-button>
    </template>
    <template #control>
      <a-button type="primary">新建</a-button>
    </template>
    <template #content>
      <h3> Table 展示</h3>
      <a-table :columns="columns" :data-source="data" bordered>
        <template
          v-for="col in ['name', 'age', 'address']"
          :slot="col"
          slot-scope="text, record"
        >
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.key)">Save</a>
              <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
            </span>
          </div>
        </template>
      </a-table>
    </template>
    <template #default>
      <div class="default-content">
        <h3>Button 展示</h3>
        <CommonButton type="primary" text="Primary size large" size="large" style="margin-right: 6px;" @click="handleButtonClick('Primary')" />
        <CommonButton type="danger" text="Danger size small" size="small" style="margin-right: 6px;" @click="handleButtonClick('Danger')" />
        <CommonButton text="Default" style="margin-right: 6px;" @click="handleButtonClick('Default')" />
        <CommonButton text="Default with disabled" disabled style="margin-right: 6px;" @click="handleButtonClick('Default')" />
        <CommonButton type="dashed" text="Dashed with icon" icon="edit" style="margin-right: 6px;" @click="handleButtonClick('Default')" />
        <CommonButton type="warning" text="type Warning" style="margin-right: 6px;" @click="handleButtonClick('Warning')" />
        <CommonButton type="success" text="type Success" style="margin-right: 6px;" @click="handleButtonClick('Success')" />
        <CommonButton
          :loading="loading"
          type="custom"
          text="type Custom"
          :color="{ textColor: 'white', default: '#13c2c2', hover: '#36cfc9', active: '#08979c'}"
          style="margin-right: 6px;"
          @click="handleButtonClick('Custom')"
        />
      </div>
      <div class="default-content">
        <h3>Dialog 展示</h3>
        <DefaultDialog />
      </div>
    </template>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/container/PageContainer'
import QueryContainer from '@/components/container/QueryContainer'
import CommonButton from '@/components/button/DefaultButton'
import DefaultDialog from '@/components/dialog/DefaultDialog'
export default {
  name: 'Demo1',
  components: {
    PageContainer,
    QueryContainer,
    CommonButton,
    DefaultDialog
  },
  data() {
    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        scopedSlots: { customRender: 'name' }
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        scopedSlots: { customRender: 'age' }
      },
      {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
        scopedSlots: { customRender: 'address' }
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }
    ]

    const data = []
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
      })
    }
    return {
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      data,
      columns,
      editingKey: '',
      cacheData: data.map(item => ({ ...item })),
      loading: false
    }
  },
  mounted() {
    window.demo = this
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save(key) {
      const newData = [...this.data]
      const newCacheData = [...this.cacheData]
      const target = newData.filter(item => key === item.key)[0]
      const targetCache = newCacheData.filter(item => key === item.key)[0]
      if (target && targetCache) {
        delete target.editable
        this.data = newData
        Object.assign(targetCache, target)
        this.cacheData = newCacheData
      }
      this.editingKey = ''
    },
    cancel(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      this.editingKey = ''
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    },
    handleButtonClick(text) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
      console.log(`Hi I am ${text} button click event handler!!!`)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
