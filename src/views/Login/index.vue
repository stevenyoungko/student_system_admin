<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <!-- <img alt="logo" class="logo" src="@/assets/img/logo.png"> -->
        <span class="title">{{ systemTitle }}</span>
      </div>
      <div class="desc">{{ systemSubTitle }}</div>
    </div>
    <div class="login">
      <a-form :form="form">
        <a-alert v-show="error" type="error" :closable="true" :message="error" show-icon style="margin-bottom: 24px;" />
        <a-form-item>
          <a-input
            v-decorator="['account', {rules: [{ required: true, message: '請輸入帳戶', whitespace: true}], initialValue: memorization.acc}]"
            autocomplete="autocomplete"
            size="large"
            placeholder="admin"
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="['password', {rules: [{ required: true, message: '請輸入密碼', whitespace: true}], initialValue: memorization.pwd}]"
            size="large"
            placeholder="123456"
            autocomplete="autocomplete"
            type="password"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-item>
        <div>
          <a-checkbox v-model="memorization.saveMe">記住我</a-checkbox>
        </div>
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" type="primary" @click="submit">登入</a-button>
        </a-form-item>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layout/CommonLayout'
import setting from '@/settings.js'
import { setLocalStorageKey, getLocalStorageKey, removeLocalStorageKey } from '@/utils/localStorage.js'

export default {
  name: 'Login',
  components: { CommonLayout },
  data() {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this),
      memorization: null,
      getLocalStorageKey
    }
  },
  computed: {
    systemTitle() {
      return setting.title
    },
    systemSubTitle() {
      return setting.subTitle
    }
  },
  created() {
    this.memorization = JSON.parse(getLocalStorageKey('user-memorization')) || {
      saveMe: false,
      acc: '',
      pwd: ''
    }
  },
  methods: {
    submit(e) {
      e.preventDefault()
      this.form.validateFields(async(err) => {
        if (!err) {
          this.logging = true
          const account = this.form.getFieldValue('account')
          const password = this.form.getFieldValue('password')
          try {
            await this.$store.dispatch('user/login', { account: account, password: password })
            if (this.memorization.saveMe) {
              this.memorization.acc = account
              this.memorization.pwd = password
              setLocalStorageKey('user-memorization', JSON.stringify(this.memorization))
            } else {
              removeLocalStorageKey('user-memorization')
            }
            this.$router.push({ name: 'Dashboard' })
          } catch (error) {
            this.logging = false
            console.log('error : ', error)
            // 登入錯誤
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login-layout{
    .top {
      text-align: center;
      .header {
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .login{
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button{
          font-size: 14px;
        }
      }
    }
  }
</style>
