<template>
  <a-button
    v-bind="$attrs"
    :class="otherTypeClass"
    v-on="$listeners"
  >
    {{ text }}
  </a-button>
</template>

<script>
import { addRule } from '@/utils/css'
export default {
  name: 'CommonButton',
  props: {
    text: {
      type: String,
      required: true,
      default: '展示用'
    }
  },
  data() {
    return {
      otherTypeClass: null,
      customedSheet: null
    }
  },
  computed: {
    isPresetTypes() {
      const presetTypesRegExp = /primary|dashed|danger|link|default/g
      return presetTypesRegExp.test(this.$attrs.type)
    }
  },
  async mounted() {
    await this.getOtherButtonType()
  },
  beforeDestroy() {
    // clean style sheet css rule before destroy component
    if (this.customedSheet) {
      const { sheet, firstIndex } = this.customedSheet
      if (sheet.cssRules.length <= firstIndex) {
        for (let i = 0; i < 3; i++) sheet.deleteRule(0)
      } else {
        for (let i = 0; i < 3; i++) sheet.deleteRule(firstIndex)
      }
    }
    // console.log('before destroy', sheet)
  },
  methods: {
    async getOtherButtonType() {
      if (this.$attrs.type && !this.isPresetTypes) {
        switch (this.$attrs.type) {
          case 'warning':
            this.otherTypeClass = 'button-warning'
            break
          case 'success':
            this.otherTypeClass = 'button-success'
            break
          default:
            if (!this.$attrs.color) {
              console.warn('[CommonButton] attribute "type" 沒有匹配到對應的類型也沒有傳入自定義的 button 顏色，將使用 antd 預設類型: default')
              return
            }
            if (!this.$attrs.color.default || !this.$attrs.color.textColor || !this.$attrs.color.hover || !this.$attrs.color.active) {
              console.warn(`[CommonButton] attribute "color" 沒有傳入對應的 property
              textColor: ${this.$attrs.color.textColor}
              default: ${this.$attrs.color.default}
              hover: ${this.$attrs.color.hover}
              active: ${this.$attrs.color.active}
              以致無法生成客製化按鈕，將使用 antd 預設類型: default`)
              return
            }
            this.customedSheet = addRule(
              [
                `.button-customed-${this._uid}`,
                `.button-customed-${this._uid}:hover, .button-customed-${this._uid}:focus`,
                `.button-customed-${this._uid}:active`
              ],
              [
                {
                  color: this.$attrs.color.textColor,
                  'background-color': this.$attrs.color.default,
                  'border-color': this.$attrs.color.default
                },
                {
                  color: this.$attrs.color.textColor,
                  'background-color': this.$attrs.color.hover,
                  'border-color': this.$attrs.color.hover
                },
                {
                  'background-color': this.$attrs.color.active,
                  'border-color': this.$attrs.color.active
                }
              ]
            )
            this.otherTypeClass = `button-customed-${this._uid}`
        }
      } else return null
    }
  }
}
</script>

<style lang="less" scoped>
// pre-defined customed button style
.button-warning {
  color: @white;
  background-color: @warning;
  border-color: @warning;
}
.button-warning:hover, .button-warning:focus {
  background-color: @warning-hover;
  border-color: @warning-hover;
}
.button-warning:active {
  background-color: @warning-active;
  border-color: @warning-active;
}
.button-success {
  color: @white;
  background-color: @success;
  border-color: @success;
}
.button-success:hover, .button-success:focus {
  background-color: @success-hover;
  border-color: @success-hover;
}
.button-success:active {
  background-color: @success-active;
  border-color: @success-active;
}
</style>
