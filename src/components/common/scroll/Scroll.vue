<template>
<!-- better-scroll要注意结构问题,
     先有一个wrapper,再包装一个content,
     保证最外层只有一个类 -->
  <div class="wrapper" ref="wrapper"> 
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name:'Scroll',
    props: {
      probeType: {
        type: Number,
        default() {
          return 0
        }
      },
      pullUpLoad: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true
      }),

      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      }),

      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time=500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      }
    },
  }
</script>

<style scoped>

</style>