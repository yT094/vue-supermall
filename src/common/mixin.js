/**
 * 防抖mixin封装
 */
import { debounce } from "common/utils"
export const itemListenerMixin = {
  data() {
    return {
      // 监听图片
      itemImgListener: null
    }
  },
  mounted() {
    // 监听item中图片加载完成
    // 给防抖函数赋值一个新的函数
    const refresh = debounce(this.$refs.scroll.refresh, 50)
   
    // 接收发射的事件总线,并用监听图片变量保存
    this.itemImgListener = () => {
      refresh()
    }      
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // console.log('我是混入的内容');
  },
}

/**
 * 回到顶部mixin封装
 */
import BackTop from "components/content/backTop/BackTop"

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = ( -position.y ) > 1000
    }
  }
}