<template>
  <div>
    <Swiper class="detail-swipe" v-if="topImages.length">
      <swiper-item v-for="(item, index) in topImages" :key="index"
                   class="item">
        <img :src="item" alt="">
      </swiper-item>
    </Swiper>
  </div>
</template>

<script>
 import {Swiper, SwiperItem} from 'components/common/swiper/index.js'

  export default {
    name: 'DetailSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .item {
    height: 300px;
    overflow: hidden;
  }
</style>