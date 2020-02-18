<template>
  <div id="home">
    <NarBar class="home-nav">
      <div slot="center">购物街</div>
    </NarBar>
    <TabControl :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl1"
                class="tab-control"
                v-show="isTabFixed"></TabControl>
    <scroll class="content" 
            ref="scroll"
            :probeType="3"
            @scroll="scroll"
            :pullUpLoad="true"
            @pullingUp="pullingUp">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl2"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </scroll>
    <BackTop @click.native="backTop"
             v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NarBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {
    getHomeMultidatachild, 
    getHomeGoodschild} 
    from 'network/home'
  import {debounce} from 'common/utils'

  export default {
    name: 'Home',
    components: {
      NarBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      scroll,
      BackTop
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
        currentType: 'pop',
        isShowBackTop: false,
        tabOffSetTop: 0,
        isTabFixed: false
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
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 200) //将refresh函数传入debounce中生成一个新的函数,这个函数会进行防抖

      this.$bus.$on('itemImgLoad', () => {
        this.$refs.scroll && refresh()
      })
      //所有的组件都有$el
      
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      //事件相关的监听方法

      //防抖函数
      //监听轮播图是否加载完成
      swiperImageLoad() {
        this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.tabOffSetTop);
      },

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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      scroll(position) {
        // console.log(position);
        //1.判断backTop是否显示
        this.isShowBackTop = -position.y > 1000

        //2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = -position.y > this.tabOffSetTop
      },
      pullingUp() {
        console.log('more');
        this.getHomeGoods(this.currentType)
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
          //console.log(res);
          this.goods[type].list.push(...res.data.list)  //通过ES6的结构赋值的方式,也可以通过遍历的方式
          this.goods[type].page += 1  //这个是data里面的数据+1

          this.$refs.scroll.finishPullUp()  //上拉加载更多
        })
      },
    },
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
    /* fixed
    生成绝对定位的元素，相对于浏览器窗口进行定位。
    元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。 */
    
  }

  /* 实现吸顶效果 */  
  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */
  /* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    /* height: 300px; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

</style>