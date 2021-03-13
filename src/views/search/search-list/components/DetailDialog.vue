<template>
  <a-modal
    v-model="visible"
    title="詳細資料"
    :mask-closable="false"
    cancel-text="取消"
    width="1000px"
    :ok-button-props="{style: { display: 'none' } }"
  >
    <ScrollableDialogContainer>
      <a-form-model
        ref="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-row type="flex" justify="center">
          <a-col :span="12">
            <a-form-model-item label="預約編號" prop="appointment">
              <span>{{ data.appointment }}</span>
            </a-form-model-item>
            <a-form-model-item label="填寫日期" prop="writeDate">
              <span>{{ data.writeDate }}</span>
            </a-form-model-item>
            <a-form-model-item label="名單來源" prop="listSource">
              <span>{{ data.listSource }}</span>
            </a-form-model-item>
            <a-form-model-item label="家長姓名" prop="parentName">
              <span>{{ data.parentName }}</span>
            </a-form-model-item>
            <a-form-model-item label="小朋友姓名" prop="childName">
              <span>{{ data.childName }}</span>
            </a-form-model-item>
            <a-form-model-item label="小朋友生日" prop="birthday">
              <span>{{ data.birthday }}</span>
            </a-form-model-item>
            <a-form-model-item label="小朋友性別" prop="gender">
              <span>{{ data.gender }}</span>
            </a-form-model-item>
            <a-form-model-item label="行動電話" prop="cellphone">
              <span>{{ data.cellphone }}</span>
            </a-form-model-item>
            <a-form-model-item label="連絡電話" prop="phone">
              <span>{{ data.phone }}</span>
            </a-form-model-item>
            <a-form-model-item label="地址" prop="address">
              <span>{{ data.address }}</span>
            </a-form-model-item>
            <a-form-model-item label="電子信箱" prop="email">
              <span>{{ data.email }}</span>
            </a-form-model-item>
            <a-form-model-item label="消息來源" prop="newsSource">
              <span>{{ data.newsSource }}</span>
            </a-form-model-item>
            <a-form-model-item label="教學中心" prop="teachCenter">
              <span>{{ data.teachCenter }}</span>
            </a-form-model-item>
            <a-form-model-item label="名單類型" prop="listType">
              <span>{{ data.listType }}</span>
            </a-form-model-item>
            <a-form-model-item label="符合班別" prop="class">
              <span>{{ data.class }}</span>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="方便聯繫時段" prop="contact">
              <span>{{ data.contact }}</span>
            </a-form-model-item>
            <a-form-model-item label="兄弟姊妹" prop="sibling">
              <span>{{ data.sibling }}</span>
            </a-form-model-item>
            <a-form-model-item label="接洽人" prop="contactPerson">
              <span>{{ data.contactPerson }}</span>
            </a-form-model-item>
            <a-form-model-item label="就學經驗" prop="experience">
              <span>{{ data.experience }}</span>
            </a-form-model-item>
            <a-form-model-item label="孩子個性" prop="personality">
              <span>{{ data.personality }}</span>
            </a-form-model-item>
            <a-form-model-item label="音樂課程經驗" prop="musicExperience">
              <span>{{ data.musicExperience }}</span>
            </a-form-model-item>
            <a-form-model-item label="其他課程經驗" prop="otherExperience">
              <span>{{ data.otherExperience }}</span>
            </a-form-model-item>
            <a-form-model-item label="主要照顧者" prop="caregiver">
              <span>{{ data.caregiver }}</span>
            </a-form-model-item>
            <a-form-model-item label="期望上課時段" prop="classTime">
              <span>{{ data.classTime }}</span>
            </a-form-model-item>
            <a-form-model-item label="備註" prop="remark">
              <span>{{ data.remark }}</span>
            </a-form-model-item>
            <a-form-model-item label="結論" prop="conclustion">
              <span>{{ data.conclustion }}</span>
            </a-form-model-item>
            <a-form-model-item label="回覆狀況" prop="reply">
              <span>{{ data.reply }}</span>
            </a-form-model-item>
            <a-form-model-item label="預約狀況" prop="reservation">
              <span>{{ data.reservation }}</span>
            </a-form-model-item>
            <a-form-model-item label="報到狀況" prop="report">
              <span>{{ data.report }}</span>
            </a-form-model-item>
            <a-form-model-item label="報名狀況" prop="register">
              <span>{{ data.register }}</span>
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
      wrapperCol: { span: 14 }
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
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-form-item {
  margin: 8px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  &-label {
    text-align: center;
    background: #f5f5f5;
  }
  &-control {
    text-align: center;
  }
}
</style>
