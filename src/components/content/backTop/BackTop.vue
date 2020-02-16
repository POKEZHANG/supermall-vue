<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'BackTop'
    }
</script>

<style scoped>
  .back-top {
    position: fixed;
    /* 生成绝对定位的元素，相对于浏览器窗口进行定位。 */
    right: 10px;
    bottom: 55px;
  }

  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>