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
        <DefaultButton type="primary" text="Primary size large" size="large" style="margin-right: 6px;" @click="handleButtonClick('Primary')" />
        <DefaultButton type="danger" text="Danger size small" size="small" style="margin-right: 6px;" @click="handleButtonClick('Danger')" />
        <DefaultButton text="Default" style="margin-right: 6px;" @click="handleButtonClick('Default')" />
        <DefaultButton text="Default with disabled" disabled style="margin-right: 6px;" @click="handleButtonClick('Default')" />
        <DefaultButton type="dashed" text="Dashed with icon" icon="edit" style="margin-right: 6px;" @click="handleButtonClick('Default')" />
        <DefaultButton type="warning" text="type Warning" style="margin-right: 6px;" @click="handleButtonClick('Warning')" />
        <DefaultButton type="success" text="type Success" style="margin-right: 6px;" @click="handleButtonClick('Success')" />
        <DefaultButton
          :loading="loading"
          type="custom"
          text="type Custom with loading"
          :color="{ textColor: 'white', default: '#13c2c2', hover: '#36cfc9', active: '#08979c'}"
          style="margin-right: 6px;"
          @click="handleButtonClick('Custom')"
        />
      </div>
      <div class="default-content">
        <h3>Dialog 展示</h3>
        <DefaultButton text="預設" style="margin-right: 6px;" @click="visible1 = true" />
        <a-modal
          v-model="visible1"
          title="展示用"
          @ok="visible1 = false"
        >
          <ScrollableDialogContainer>
            <h4>預設內容高度限制為 : 55vh</h4>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </ScrollableDialogContainer>
        </a-modal>
        <DefaultButton text="可調整內容可視域" style="margin-right: 6px;" @click="visible2 = true" />
        <a-modal
          v-model="visible2"
          title="展示用"
          @ok="visible2 = false"
        >
          <ScrollableDialogContainer content-height="40vh">
            <h4>調整內容高度限制為 : 40vh</h4>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </ScrollableDialogContainer>
        </a-modal>
        <DefaultButton text="自定義 footer" style="margin-right: 6px;" @click="visible3 = true" />
        <a-modal
          v-model="visible3"
          title="展示用"
        >
          <ScrollableDialogContainer>
            同 ant-design-vue 範例
          </ScrollableDialogContainer>
          <template slot="footer">
            <DefaultButton type="warning" text="return" @click="handleReturn" />
            <DefaultButton type="success" text="submit" @click="handleSubmit" />
          </template>
        </a-modal>
        <DefaultButton text="自定義 title" style="margin-right: 6px;" @click="visible4 = true" />
        <a-modal
          v-model="visible4"
          @ok="visible4 = false"
        >
          <template slot="title">
            <span style="font-weight: 700; color: red">This is a custom title</span>
          </template>
          <ScrollableDialogContainer>
            同 ant-design-vue 範例
          </ScrollableDialogContainer>
        </a-modal>
      </div>
      <div class="default-content">
        <h3>Notification 展示</h3>
        <DefaultButton text="預設通知" style="margin-right: 6px;" @click="basicNotify" />
        <DefaultButton text="成功類型" style="margin-right: 6px;" @click="successNotify" />
        <DefaultButton text="錯誤類型" style="margin-right: 6px;" @click="errorNotify" />
        <DefaultButton text="警告類型" style="margin-right: 6px;" @click="warningNotify" />
        <DefaultButton text="消息類型" style="margin-right: 6px;" @click="infoNotify" />
        <DefaultButton text="自定義通知" style="margin-right: 6px;" @click="customNotify" />
        <DefaultButton text="完整通知" style="margin-right: 6px;" @click="fullNotify" />
      </div>
      <div class="default-content">
        <h3>Message 展示</h3>
        <DefaultButton text="預設訊息" style="margin-right: 6px;" @click="basicMessage" />
        <DefaultButton text="成功類型" style="margin-right: 6px;" @click="successMessage" />
        <DefaultButton text="錯誤類型" style="margin-right: 6px;" @click="errorMessage" />
        <DefaultButton text="警告類型" style="margin-right: 6px;" @click="warningMessage" />
        <DefaultButton text="消息類型" style="margin-right: 6px;" @click="infoMessage" />
        <DefaultButton text="自定義訊息" style="margin-right: 6px;" @click="customMessage" />
        <DefaultButton text="完整訊息" style="margin-right: 6px;" @click="fullMessage" />
      </div>
    </template>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/container/PageContainer'
import QueryContainer from '@/components/container/QueryContainer'
import DefaultButton from '@/components/button/DefaultButton'
import ScrollableDialogContainer from '@/components/dialog/ScrollableDialogContainer'

import { notify, message } from '@/utils/notification'
export default {
  name: 'Demo1',
  components: {
    PageContainer,
    QueryContainer,
    DefaultButton,
    ScrollableDialogContainer
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
      loading: false,
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false
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
      if (text === 'Custom') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
      console.log(`Hi I am ${text} button click event handler!!!`)
    },
    handleSubmit() {
      console.log('submit')
      this.visible3 = false
    },
    handleReturn() {
      console.log('return')
      this.visible3 = false
    },
    basicNotify() {
      notify()
    },
    successNotify() {
      notify('success', {
        message: '成功的通知',
        description: '這是一則成功的通知'
      })
    },
    errorNotify() {
      notify('error', {
        message: '錯誤的通知',
        description: '這是一則錯誤的通知'
      })
    },
    warningNotify() {
      notify('warning', {
        message: '警告的通知',
        description: '這是一則警告的通知'
      })
    },
    infoNotify() {
      notify('info', {
        message: '消息的通知',
        description: '這是一則消息的通知'
      })
    },
    customNotify() {
      notify('custom', {
        message: '客製化通知',
        description: '這是一則消息的通知，請點擊按鈕完成動作。',
        icon: <a-icon type='question-circle' />,
        key: 'customId',
        duration: null,
        btn: (h) => h('a-button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          on: {
            click: () => { notify('close', { key: 'customId' }) }
          }
        }, '知道了')
      })
    },
    fullNotify() {
      var key = 'fullId'
      notify('custom', {
        message: '等待中...',
        icon: <a-icon type='loading' />,
        key
      })
      setTimeout(() => {
        notify('success', {
          message: '完成',
          key
        })
      }, 1000)
    },
    basicMessage() {
      message()
    },
    successMessage() {
      message('success', {
        content: '成功的訊息'
      })
    },
    errorMessage() {
      message('error', {
        content: '錯誤的訊息'
      })
    },
    warningMessage() {
      message('warning', {
        content: '警告的訊息'
      })
    },
    infoMessage() {
      message('info', {
        content: '消息的訊息'
      })
    },
    customMessage() {
      message('custom', {
        content: '客製化訊息，將於5秒後關閉...',
        icon: <a-icon type='question-circle' />,
        key: 'customId',
        duration: 5,
        onClose: () => {
          console.log('custom message closed...')
        }
      })
    },
    fullMessage() {
      var key = 'fullId'
      message('custom', {
        content: '等待中...',
        icon: <a-icon type='loading' />,
        key
      })
      setTimeout(() => {
        message('success', {
          content: '完成',
          key
        })
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
