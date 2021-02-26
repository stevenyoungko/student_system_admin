<template>
  <div class="slot-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'SlotLayout'
}
</script>

<style lang="less">
.slot-layout {
  display: flex;
  flex: 1;
}
</style>
