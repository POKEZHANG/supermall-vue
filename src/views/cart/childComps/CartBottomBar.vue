<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></CheckButton>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate">去计算({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return this.$store.getters.cartList.filter(item => item.checked).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {  //true->全选 false->有未被选中的 
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        if(this.$store.state.cartList.length === 0) return false
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = false
          });
        } else {
          this.$store.state.cartList.forEach(item => {
            item.checked = true
          });
        }
        console.log('1111');
        
      }
    },
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    width: 100%;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    line-height: 40px;
    display: flex;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    color: #fff;
    text-align: center;
    background-color: red;
  }
</style>