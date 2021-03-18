<template>
  <a-modal
    :visible="visible"
    :title="isDetail ? '詳細資料':'編輯資料' "
    :mask-closable="false"
    :cancel-text="isDetail ? '取消' : '回上動'"
    :ok-text="isDetail ? '編輯' : '保存'"
    width="800px"
    @ok="handleOkChange"
    @cancel="handleCancelChange"
  >
    <ScrollableDialogContainer content-height="70vh">
      <a-form-model
        ref="ruleForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="form"
      >
        <a-row type="flex" justify="center">
          <a-col :span="12">
            <a-form-model-item label="預約編號" prop="appointment">
              <span>{{ form.appointment }}</span>
            </a-form-model-item>
            <a-form-model-item label="填寫日期" prop="writeDate">
              <span>{{ form.writeDate }}</span>
            </a-form-model-item>
            <a-form-model-item label="名單來源" prop="listSource">
              <span>{{ form.listSource }}</span>
            </a-form-model-item>
            <a-form-model-item label="家長姓名" prop="parentName">
              <span v-if="isDetail">{{ form.parentName }}</span>
              <a-input v-else v-model="form.parentName" />
            </a-form-model-item>
            <a-form-model-item label="小朋友姓名" prop="childName">
              <span v-if="isDetail">{{ form.childName }}</span>
              <a-input v-else v-model="form.childName" />
            </a-form-model-item>
            <a-form-model-item label="小朋友生日" prop="birthday">
              <span v-if="isDetail">{{ form.birthday }}</span>
              <a-date-picker v-else v-model="form.birthday" />
            </a-form-model-item>
            <a-form-model-item label="小朋友性別" prop="gender">
              <span v-if="isDetail">{{ form.gender }}</span>
              <a-radio-group v-else v-model="form.gender">
                <a-radio value="男">
                  男
                </a-radio>
                <a-radio value="女">
                  女
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="行動電話" prop="cellphone">
              <span v-if="isDetail">{{ form.cellphone }}</span>
              <a-input v-else v-model="form.cellphone" />
            </a-form-model-item>
            <a-form-model-item label="連絡電話" prop="phone">
              <span v-if="isDetail">{{ form.phone }}</span>
              <a-input v-else v-model="form.phone" />
            </a-form-model-item>
            <a-form-model-item label="地址" prop="address">
              <span v-if="isDetail">{{ form.address }}</span>
              <a-input v-else v-model="form.address" />
            </a-form-model-item>
            <a-form-model-item label="電子信箱" prop="email">
              <span v-if="isDetail">{{ form.email }}</span>
              <a-input v-else v-model="form.email" />
            </a-form-model-item>
            <a-form-model-item label="教學中心" prop="teachCenter">
              <span v-if="isDetail">{{ form.teachCenter }}</span>
              <a-select v-else v-model="form.teachCenter">
                <a-select-option value="1">
                  總部
                </a-select-option>
                <a-select-option value="2">
                  分部
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="符合班別" prop="class">
              <span v-if="isDetail">{{ form.class }}</span>
              <a-select v-else v-model="form.class">
                <a-select-option value="1">
                  未足齡
                </a-select-option>
                <a-select-option value="2">
                  樂樂班
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="名單類型" prop="listType">
              <span v-if="isDetail">{{ form.listType }}</span>
              <a-select v-else v-model="form.listType">
                <a-select-option value="1">
                  有效
                </a-select-option>
                <a-select-option value="2">
                  潛力
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="消息來源" prop="newsSource">
              <span v-if="isDetail">{{ form.newsSource }}</span>
              <a-select v-else v-model="form.newsSource">
                <a-select-option value="1">
                  FB
                </a-select-option>
                <a-select-option value="2">
                  報紙
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="方便聯繫時段" prop="contact">
              <span v-if="isDetail">{{ form.contact }}</span>
              <a-select v-else v-model="form.contact">
                <a-select-option value="1">
                  下午
                </a-select-option>
                <a-select-option value="2">
                  晚上
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="兄弟姊妹" prop="sibling">
              <span v-if="isDetail">{{ form.sibling }}</span>
              <a-input v-else v-model="form.sibling" />
            </a-form-model-item>
            <a-form-model-item label="接洽人" prop="contactPerson">
              <span v-if="isDetail">{{ form.contactPerson }}</span>
              <a-input v-else v-model="form.contactPerson" />
            </a-form-model-item>
            <a-form-model-item label="就學經驗" prop="experience">
              <span v-if="isDetail">{{ form.experience }}</span>
              <a-input v-else v-model="form.experience" />
            </a-form-model-item>
            <a-form-model-item label="孩子個性" prop="personality">
              <span v-if="isDetail">{{ form.personality }}</span>
              <a-input v-else v-model="form.personality" />
            </a-form-model-item>
            <a-form-model-item label="音樂課程經驗" prop="musicExperience">
              <span v-if="isDetail">{{ form.musicExperience }}</span>
              <a-input v-else v-model="form.musicExperience" />
            </a-form-model-item>
            <a-form-model-item label="其他課程經驗" prop="otherExperience">
              <span v-if="isDetail">{{ form.otherExperience }}</span>
              <a-input v-else v-model="form.otherExperience" />
            </a-form-model-item>
            <a-form-model-item label="主要照顧者" prop="caregiver">
              <span v-if="isDetail">{{ form.caregiver }}</span>
              <a-input v-else v-model="form.caregiver" />
            </a-form-model-item>
            <a-form-model-item label="期望上課時段" prop="classTime">
              <span v-if="isDetail">{{ form.classTime }}</span>
              <a-input v-else v-model="form.classTime" />
            </a-form-model-item>
            <a-form-model-item label="備註" prop="remark">
              <span v-if="isDetail">{{ form.remark }}</span>
              <a-input v-else v-model="form.remark" />
            </a-form-model-item>
            <a-form-model-item label="結論" prop="conclustion">
              <span v-if="isDetail">{{ form.conclustion }}</span>
              <a-input v-else v-model="form.conclustion" />
            </a-form-model-item>
            <a-form-model-item label="回覆狀況" prop="reply">
              <span v-if="isDetail">{{ form.reply }}</span>
              <a-radio-group v-else v-model="form.reply">
                <a-radio value="1">
                  未回覆
                </a-radio>
                <a-radio value="0">
                  已回覆
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="預約狀況" prop="reservation">
              <span v-if="isDetail">{{ form.reservation }}</span>
              <a-select v-else v-model="form.reservation">
                <a-select-option value="1">
                  未預約
                </a-select-option>
                <a-select-option value="2">
                  示範教學
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="報到狀況" prop="report">
              <span v-if="isDetail">{{ form.report }}</span>
              <a-radio-group v-else v-model="form.report">
                <a-radio value="1">
                  未報到
                </a-radio>
                <a-radio value="0">
                  已報到
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="報名狀況" prop="register">
              <span v-if="isDetail">{{ form.register }}</span>
              <a-radio-group v-else v-model="form.register">
                <a-radio value="1">
                  未報名
                </a-radio>
                <a-radio value="0">
                  已報名
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </ScrollableDialogContainer>
  </a-modal>
</template>

<script>
import ScrollableDialogContainer from '@/components/dialog/ScrollableDialogContainer'
export default {
  name: 'DetailDialog',
  components: {
    ScrollableDialogContainer
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    },
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      mode: 'detail',
      form: {
        parentName: null,
        childName: null,
        birthday: null,
        gender: null,
        cellphone: null,
        phone: null,
        address: null,
        email: null,
        teachCenter: null,
        listType: null,
        newsSource: null,
        class: null,
        contact: null,
        sibling: null,
        contactPerson: null,
        experience: null,
        personality: null,
        musicExperience: null,
        otherExperience: null,
        caregiver: null,
        remark: null,
        conclustion: null,
        reply: null,
        reservation: null,
        report: null,
        register: null
      }
    }
  },
  computed: {
    visible: {
      get() {
        return this.showModal
      },
      set(val) {
        this.$emit('update:showModal', val)
      }
    },
    isDetail() {
      return this.mode === 'detail'
    }
  },
  watch: {
    visible() {
      Object.assign(this.form, this.data)
    }
  },
  methods: {
    handleOkChange() {
      switch (this.mode) {
        case 'detail':
          this.mode = 'edit'
          break
        default:
          break
      }
    },
    handleCancelChange() {
      switch (this.mode) {
        case 'detail':
          this.visible = false
          break
        case 'edit':
          this.mode = 'detail'
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-form-item {
  &-label {
    color: #606266;
    font-weight: bold;
  }
}

/deep/ .ant-modal {
  top: 65px;
}
</style>
