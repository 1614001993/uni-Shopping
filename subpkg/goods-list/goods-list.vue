<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,index) in goodsList" :key="index" @click="gotoGoodsdetail(item)">
        <!-- 每个商品的项 -->
        <my-goods :item="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        isloading: false,
        goodsList: [],
        total: 0,


      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodList()
    },
    methods: {
      async getGoodList(cb) {
        this.isloading = true;
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isloading = false;
        cb&&cb()
        if (res.meta.status !== 200) {
          return uni.showMsg()
        }
        this.goodsList = [...this.goodsList, ...res.message.goods]
        console.log(res.message);
        this.total = res.message.total
      },
      gotoGoodsdetail(item){
        uni.navigateTo({
          url:'/subpkg/goods-detail/goods-detail?goods_id='+item.goods_id
        })
      },
    },
    //下拉触底事件
    onReachBottom() {
              if(this.queryObj.pagenum*this.queryObj.pagesize>=this. total)return uni.showMsg('数据加载完毕')
      // 页码值加一
      if (this.isloading) return

      this.queryObj.pagenum += 1
      this.getGoodList()
    },
    onPullDownRefresh() {
      this.queryObj.pagenum=1
      this.total=0
      this.isloading=false
      this.goodsList=[]
      this.getGoodList(()=>{
        uni.stopPullDownRefresh()
      })
    }
  }
</script>

<style lang="scss">
</style>
