<template>
  <div id="detail">
    <DetailNavBar class="datail-navbar" @titleClick="titleClick"></DetailNavBar>
    <Scroll class="content" ref="scroll">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo"
                       @imgLoad="imgLoad"></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo" ref="params"></DetailParamInfo>
      <DetailCommentInfo :commentInfo="commentInfo" ref="comment"></DetailCommentInfo>
      <GoodsList :goods="recommends" ref="recommends"></GoodsList>
    </Scroll>
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
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
  import {debounce} from 'common/utils.js'

  

  export default {
    name: 'Detail',
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
        getThemeTopY: null
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
      GoodsList,
      Scroll
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
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 44);
        console.log(this.themeTopYs);
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
        console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      }
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9999;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px);
  }

  .datail-navbar{
    position: relative;
    z-index: 9999;
    background-color: #fff;
  }
</style>