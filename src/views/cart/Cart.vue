<template>
  <div id="cart">
    <!-- 导航 -->
    <NavBar class="navbar">
      <div slot="center">购物车({{length}})</div>
    </NavBar>
    <!-- 列表 -->
    <CartList></CartList>
    <!-- 汇总 -->
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      //直接把vuex的store里面的getter映射到局部计算属性
      ...mapGetters({length: 'cartLength'}),
      // ...mapGetters(['cartLength']),
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }
    },
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }
  .navbar {
    background: var(--color-tint);
    color: #fff;
  }

</style>