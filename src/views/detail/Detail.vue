<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  
  import { getDetail } from "network/detail"

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: []
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper
    },
    created() {
      // 1.保存传入的 iid
      this.iid = this.$route.params.iid

      // 2.根据 iid 请求详情数据
      getDetail(this.iid).then( res => {
        // 1.获取顶部轮播图的数据
        this.topImages = res.result.itemInfo.topImages
      })
    }
  }
</script>

<style scoped>

</style>
