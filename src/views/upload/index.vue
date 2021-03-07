<template>
  <PageContainer>
    <template #control>
      <a-form-model
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        layout="horizontal"
        :model="typeForm"
      >
        <a-form-model-item label="課程類型">
          <a-select v-model="typeForm.course">
            <a-select-option value="child">
              兒童課程
            </a-select-option>
            <a-select-option value="adult">
              成人課程
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model />
      </a-form-model>
    </template>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/container/PageContainer'
export default {
  name: 'Upload',
  components: {
    PageContainer
  },
  data() {
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
      typeForm: {
        course: 'child'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
