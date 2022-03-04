<template>
  <div>详情页
    <div>{{iid}}</div>
  </div>
  
</template>

<script>
  export default {
    name: "Detail",
    data() {
      return {
        iid: null
      }
    },
    created() {
      this.iid = this.$route.params.iid
    }
  }
</script>

<style scoped>

</style>
