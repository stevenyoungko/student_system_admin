<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item label="姓名" prop="name">
      <a-input v-model="form.name" placeholder="請選擇姓名" />
    </a-form-model-item>
    <a-form-model-item label="年齡" prop="age">
      <a-input v-model="form.age" placeholder="請選擇年齡" />
    </a-form-model-item>
    <a-form-model-item label="生日" prop="birthday">
      <a-date-picker
        v-model="form.birthday"
        placeholder="請選擇生日"
        style="width: 100%;"
      />
    </a-form-model-item>
    <a-form-model-item label="性別" prop="gender">
      <a-select v-model="form.gender" placeholder="請選擇性別">
        <a-select-option value="1">
          男
        </a-select-option>
        <a-select-option value="2">
          女
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="行動電話" prop="cellphone">
      <a-input v-model="form.cellphone" placeholder="請輸入行動電話" />
    </a-form-model-item>
    <a-form-model-item label="連絡電話" prop="phone">
      <a-input v-model="form.phone" placeholder="請輸入連絡電話" />
    </a-form-model-item>
    <a-form-model-item label="地址" prop="region">
      <a-select v-model="form.region" placeholder="請選擇地址">
        <a-select-option value="1">
          台北市
        </a-select-option>
        <a-select-option value="2">
          新北市
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="電子信箱" prop="email">
      <a-input v-model="form.email" placeholder="請輸入電子信箱" />
    </a-form-model-item>
    <a-form-model-item label="消息來源" prop="news">
      <a-select v-model="form.news" placeholder="請選擇消息來源">
        <a-select-option value="1">
          網路
        </a-select-option>
        <a-select-option value="2">
          報紙
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="教學中心" prop="teach">
      <a-select v-model="form.teach" placeholder="請選擇教學中心">
        <a-select-option value="1">
          教學中心1
        </a-select-option>
        <a-select-option value="2">
          教學中心2
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="名單類型" prop="listType">
      <a-select v-model="form.listType" placeholder="請選擇名單類型">
        <a-select-option value="1">
          有效名單
        </a-select-option>
        <a-select-option value="2">
          潛力名單
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="名單來源" prop="listSource">
      <a-select v-model="form.listType" placeholder="請選擇名單來源">
        <a-select-option value="1">
          FB
        </a-select-option>
        <a-select-option value="2">
          來電
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="方便聯繫時段" prop="contact">
      <a-select v-model="form.listType" placeholder="請選擇方便聯繫時段">
        <a-select-option value="1">
          下午
        </a-select-option>
        <a-select-option value="2">
          晚上
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 10, offset: 7 }">
      <a-button type="primary" @click="onSubmit">
        建立
      </a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">
        重設
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  name: 'AdultForm',
  data() {
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 10 },
      form: {
        name: '',
        age: '',
        birthday: undefined,
        gender: undefined,
        cellphone: '',
        phone: '',
        region: undefined,
        email: '',
        news: undefined,
        teach: undefined,
        listType: undefined,
        listSource: undefined,
        contact: undefined
      },
      rules: {
        name: [{ required: true, message: '請輸入姓名', trigger: 'blur' }],
        age: [{ required: true, message: '請輸入年齡', trigger: 'blur' }],
        birthday: [{ required: true, message: '請輸入生日', trigger: 'change' }],
        gender: [{ required: true, message: '請輸入性別', trigger: 'change' }],
        cellphone: [{ required: true, message: '請輸入行動電話', trigger: 'blur' }],
        phone: [{ required: true, message: '請輸入連絡電話', trigger: 'blur' }],
        region: [{ required: true, message: '請選擇地址', trigger: 'change' }],
        email: [{ required: true, message: '請輸入連絡電話', trigger: 'blur' }],
        news: [{ required: true, message: '請選擇消息來源', trigger: 'change' }],
        teach: [{ required: true, message: '請選擇教學中心', trigger: 'change' }],
        listType: [{ required: true, message: '請選擇名單類型', trigger: 'change' }],
        listSource: [{ required: true, message: '請選擇名單來源', trigger: 'change' }],
        contact: [{ required: true, message: '請選擇方便聯繫時段', trigger: 'change' }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
