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
      }
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
        probeType: this.probeType
      })

      // 2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        // 自定义事件
        this.$emit('scroll', position)
      })
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      }
    }
  }
</script>

<style scoped>

</style>