<template>
  <a-modal
    v-model="visible"
    title="設定群組"
    :mask-closable="false"
    cancel-text="取消"
    ok-text="保存"
  >
    <ScrollableDialogContainer>
      <a-form-model
        ref="ruleForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="form"
      >
        <a-form-model-item label="群組名稱" prop="group">
          <a-select v-model="form.group" placeholder="請選擇群組名稱">
            <a-select-option value="1">
              群組a
            </a-select-option>
            <a-select-option value="2">
              群組b
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </ScrollableDialogContainer>
  </a-modal>
</template>

<script>
import ScrollableDialogContainer from '@/components/dialog/ScrollableDialogContainer'
export default {
  name: 'SettingDialog',
  components: {
    ScrollableDialogContainer
  },
  props: {
    selectedRowKeys: {
      type: Array,
      default: () => []
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
      form: {
        group: undefined
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
