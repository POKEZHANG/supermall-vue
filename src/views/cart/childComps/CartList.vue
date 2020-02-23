<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <!-- <li v-for="(item, index) in cartList" :key="index">{{item.title}}</li> -->
      <CartListItem  v-for="(item, index) in cartList" :key="index"
                     :itemInfo="item"></CartListItem>
    </Scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import CartListItem from './CartListItem'

  import {mapGetters} from 'vuex'

  export default {
    name: 'CartList',
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
  .cart-list {
    height: 100%
  }
  .content {
    height: calc(100% - 49px - 40px - 44px);
    overflow: hidden;
  }
</style>