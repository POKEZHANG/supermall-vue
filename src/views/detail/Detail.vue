<template>
  <div id="detail">
    <DetailNavBar class="datail-navbar" @titleClick="titleClick" ref="nav"></DetailNavBar>
    <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll"> 
      <!-- @XXXX="YYYY" @后的名字是子组件发出的名字, YYYY是父组件接收的名字 -->
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo"
                       @imgLoad="imgLoad"></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo" ref="params"></DetailParamInfo>
      <DetailCommentInfo :commentInfo="commentInfo" ref="comment"></DetailCommentInfo>
      <GoodsList :goods="recommends" ref="recommends"></GoodsList>
    </Scroll>
    <BackTop @click.native="backTop"
             v-show="isShowBackTop"></BackTop>
    <DetailBottomBar @addCart='addCart'></DetailBottomBar>
  </div>
</template>

<script>
  import DetailNavBar from './childComs/DetailNavBar'
  import DetailSwiper from './childComs/DetailSwiper'
  import DetailBaseInfo from './childComs/DetailBaseInfo'
  import DetailShopInfo from './childComs/DetailShopInfo'
  import DetailGoodsInfo from './childComs/DetailGoodsInfo'
  import DetailParamInfo from './childComs/DetailParamInfo'
  import DetailCommentInfo from './childComs/DetailCommentInfo'
  import DetailBottomBar from './childComs/DetailBottomBar'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
  import {debounce} from 'common/utils.js'
  import {backTop} from 'common/mixin.js'
  

  export default {
    name: 'Detail',
    mixins: [backTop],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll,
    },
    created() {
      this.iid = this.$route.params.iid
      
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        // this.$nextTick(() => {
        //   this.themeTopY = []
        //   console.log(this.themeTopYs);
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        //   console.log(this.themeTopYs);

        // })
      })
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);

        // console.log(this.themeTopYs);
      })
      
    },
    mounted() {
      this.$bus.$on('detailItemImgLoad', () => {
      this.$refs.scroll && refresh()
      })
    },
    updated() {
      // this.themeTopY = []

      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      // console.log(this.themeTopYs);
    },
    methods: {
      imgLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        let length = this.themeTopYs.length
        const positionY = -position.y
        for(let i =0; i < length-1; i++) {

          // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
          //   console.log(i);
          // }

          // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) 
          //   || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          //   this.currentIndex = i
          //   console.log(this.currentIndex);
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }

          if(this.currentIndex !== i && (positionY >=  this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
          // 回到顶部
          this.isShowBackTop = -position.y > 1000
        }
      },
      addCart() {
        console.log("加入购物车");
        const product = {}
        product.img = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.nowPrice
        product.iid = this.iid

        // this.$store.commit('addCart', product)
        this.$store.dispatch('addCart', product)
      }
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    background-color: #fff;
    height: 100vh;
    z-index: 99;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }

  .datail-navbar{
    position: fixed;
    width: 100%;
    z-index: 9999;
    background-color: #fff;
  }
</style>