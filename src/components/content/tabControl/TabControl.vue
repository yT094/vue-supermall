<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="item.id" class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)" >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        // 记录当前谁被选中
        currentIndex: 0,
      }
    },
    methods: {
      // 监听 item 的点击
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('itemClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    /* 让下划线宽于文字两端 */
    padding: 5px;
  }

  .active {
    color: var(--color-height-text);
  }

  .active span {
    /* 给 span 加下划线，而不是给 div */
    border-bottom: 3px solid var(--color-tint);
  }

</style>
