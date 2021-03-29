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
            <a-select-option v-for="classItem in classList" :key="classItem.id">
              {{ classItem.class_name }}
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
        course: undefined
      },
      currentComponent: ChildForm,
      classList: []
    }
  },
  created() {
    this.getClassList()
  },
  methods: {
    async getClassList() {
      const data = await this.$store.dispatch('listInfo/getClassList')
      this.classList = data
    },
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
