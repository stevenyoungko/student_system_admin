<template>
  <PageContainer>
    <template #control>
      <a-form-model
        :label-col="{ span: 2}"
        :wrapper-col="{ span: 4}"
        layout="horizontal"
        :model="form"
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
        <a-form-model />
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
