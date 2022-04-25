<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList"
            :key="index" :itemInfo="item"/>

    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll"
  import CartListItem from './CartListItem'

  import { mapGetters } from 'vuex'

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters( ['cartList'] )
    },
    activated() {
      // 注意：如果没有 refresh，会影响滚动
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
