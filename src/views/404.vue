<template>
  <div class="error-page">
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist." class="result">
      <template #extra>
        <a-button type="primary" @click="toIndex">
          Back Home
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  methods: {
    toIndex() {
      location.href = '/'
    }
  }
}
</script>

<style lang="less" scoped>
.error-page {
  position: relative;
  height: 100%;
  .result {
    position: relative;
    top: 15%;
  }
}
</style>
