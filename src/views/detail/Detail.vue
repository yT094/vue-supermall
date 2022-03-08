<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommendList"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"
  
  import Scroll from "components/common/scroll/Scroll"
  import GoodsList from "components/content/goods/GoodsList"

  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail"
  import { itemListenerMixin, backTopMixin } from "common/mixin"
  import { debounce } from "common/utils"

  export default {
    name: "Detail",
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: -1
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      contentScroll(position) {
        // 1.获取 y 值
        const positionY = - position.y
        
        // 2.positionY和主题中值进行比较
        this.themeTopYs.push(Number.MAX_VALUE)
        let length = this.themeTopYs.length
        for (let i = 0; i < length - 1; i++) {
          if( (this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ) {
            this.currentIndex = i
            // console.log(this.currentIndex);
            this.$refs.navbar.currentIndex = this.currentIndex
          } 
        }

        // 3. 判断 BackTop 是否显示
        // this.isShowBackTop = (-position.y) > 1000
        this.listenShowBackTop(position)
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.newPrice
        product.iid = this.iid

        // 2.将商品添加到购物车里
        // 通过 mutations 修改 store 的数据
        this.$store.commit('addCart', product)
      }
    },
    created() {
      // 1.保存传入的 iid
      this.iid = this.$route.params.iid

      // 2.根据 iid 请求详情数据
      getDetail(this.iid).then( res => {
        const data = res.result
        // 1.获取顶部轮播图的数据
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {}
        }
      })

      // 3.获取推荐的数据
      getRecommend().then( res => {
        this.recommendList = res.data.list
      })
      
      // 4.获取各主题的 TopY 值(对给 this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      }, 100)
    },

    destroyed() {
      // 取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    /* 内容的滚动区域 */
    background-color: #fff;
    height: calc(100% - 44px - 49px)
  }
</style>
