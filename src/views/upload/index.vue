<template>
  <PageContainer>
    <template #control>
      <a-form-model
        layout="horizontal"
        :model="form"
        :label-col="{ span: 2}"
        :wrapper-col="{ span: 4}"
      >
        <a-form-model-item label="課程類型">
          <a-select v-model="form.course" @change="changeComponent">
            <a-select-option value="child">
              兒童課程
            </a-select-option>
            <a-select-option value="adult">
              成人課程
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="批次上傳">
          <div style="display: flex; align-items: flex-start;">
            <a-upload
              name="file"
              :multiple="true"
            >
              <a-button style="margin-right: 16px;">
                <a-icon type="upload" />
                Upload
              </a-button>
            </a-upload>
            <a-button type="primary" style="margin-top: 4px;">
              上傳
            </a-button>
          </div>
          <a-form-model />
        </a-form-model-item>
      </a-form-model>
    </template>
    <template #content>
      <components :is="currentComponent" />
    </template>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/container/PageContainer'
import ChildForm from './components/ChildForm'
import AdultForm from './components/AdultForm'
export default {
  name: 'Upload',
  components: {
    PageContainer,
    ChildForm,
    AdultForm
  },
  data() {
    return {
      form: {
        course: 'child'
      },
      currentComponent: ChildForm
    }
  },
  methods: {
    changeComponent() {
      switch (this.form.course) {
        case 'child':
          this.currentComponent = ChildForm
          break
        case 'adult':
          this.currentComponent = AdultForm
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
