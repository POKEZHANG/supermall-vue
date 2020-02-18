<template>
  <NavBar>
    <div slot="left" class="back" @click="back">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item,index) in title" :key="index"
           class="title-item"
           :class="{isActive: index === currentIndex}"
           @click="itemClick(index)">{{item}}</div>
    </div>
  </NavBar>
</template>

<script> 
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'DetailNavBar',
    data() {
      return {
        title: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
      },
      back() {
        this.$router.go(-1)
      }
    },
    components: {
      NavBar
    },    
  }
</script>

<style>
  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
  }

  .isActive {
    color: var(--color-high-text);
  }

  .back img{
    margin-top: 12px;
  }
</style>