<template>
  <div id="home">
    <NarBar class="home-nav">
      <div slot="center">购物街</div>
    </NarBar>
    <HomeSwiper :banners="banners"></HomeSwiper>
    <RecommendView :recommends="recommends"></RecommendView>
    <FeatureView></FeatureView>
    <TabControl :titles="['流行','新款','精选']"
    class="tab-control" @tabClick="tabClick"></TabControl>
    <GoodsList :goods="showGoods"></GoodsList>
    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NarBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import {
    getHomeMultidatachild, 
    getHomeGoodschild} 
    from 'network/home'

  export default {
    name: 'Home',
    components: {
      NarBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list:[]},
          'new': {page: 0, list:[]},
          'sell': {page: 0, list:[]}
        },
        currentType: 'pop'
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      //事件相关的监听方法
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2
          :
            this.currentType = 'sell'
            break
        }
      },


      // 网络请求相关的方法
      getHomeMultidata() {
        getHomeMultidatachild().then(res => {  //().调用
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1; //这个是参数
        getHomeGoodschild(type, page).then(res => {
          console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1  //这个是data里面的数据+1
        })
      },
    },
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    /* fixed
    生成绝对定位的元素，相对于浏览器窗口进行定位。
    元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。 */
    z-index: 9;
  }
  
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  /* 实现吸顶效果 */
</style>