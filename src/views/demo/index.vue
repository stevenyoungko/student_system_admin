<template>
  <PageContainer>
    <template #query>
      <QueryContainer :layout="'inline'">
        <template #priority>
          <a-form-model-item label="Username" required>
            <a-input v-model="formInline.user" placeholder="Username">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="Password">
            <a-input v-model="formInline.password" type="password" placeholder="Password">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
        </template>
        <template>
          <a-form-model-item label="Username">
            <a-input v-model="formInline.user" placeholder="Username">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="Password">
            <a-input v-model="formInline.password" type="password" placeholder="Password">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
        </template>
      </QueryContainer>
    </template>
    <template #query-action>
      <!-- <el-button type="primary" size="mini" @click="resetForm">重置</el-button> -->
      <a-button icon="search">查詢</a-button>
    </template>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/common/PageContainer'
import QueryContainer from '@/components/common/QueryContainer'
export default {
  name: 'Demo1',
  components: {
    PageContainer,
    QueryContainer
  },
  data() {
    return {
      formInline: {
        user: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
