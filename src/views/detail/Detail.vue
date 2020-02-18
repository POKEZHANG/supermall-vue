<template>
  <div id="detail">
    <DetailNavBar class="datail-navbar"></DetailNavBar>
    <Scroll class="content" ref="scroll">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo"
                       @imgLoad="imgLoad"></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo"></DetailParamInfo>
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
  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'

  

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
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
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
      })
    },
    methods: {
      imgLoad() {
        this.$refs.scroll.refresh()
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