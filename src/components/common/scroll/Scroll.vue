<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        // 这是 scroll 这个对象
        scroll: null,
      }
    },
    mounted() {
      // 1.创建 BScroll 对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 限制 div span 标签
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      })

      // 2.监听滚动的位置
      if (this.probeType == 2 || this.probeType == 3) {
          this.scroll.on('scroll', (position) => {
          // console.log(position);
          // 自定义事件
          this.$emit('scroll', position)
        })        
      }

      // 3.监听scroll滚动到底部
      if ( this.pullUpLoad ) {
        this.scroll.on('pullingUp', () => {
          // console.log('监听到滚动到底部');
          this.$emit('pullingUp')
        })
      }
      //打印 Scroll 对象
      // console.log(this.scrolll);
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      },
    }
  }
</script>

<style scoped>

</style>