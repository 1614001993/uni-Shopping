<template>
  <view>
    <!-- 搜索组件 -->
    <view class="searchComm">
          <my-search @click="gotoSearch()"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in swipperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods-detail/goods-detail?goods_id='+item.goods_id">
          <image :src="item.image_src" mode="" class="swiperImg"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in categoryNav" :key='index' @click="navClickhandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item,index) in FloorList" :key="index">
        <image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
        <!-- 图片楼层 -->
        <view class="floor-img-box">
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx' }" mode="widthFix"></image>
          </navigator>
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item,index) in item.product_list" :key="index" v-if="index!==0" :url="item.url">
              <image :src="item.image_src" :style="{width:item.image_width+'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
      <!-- 楼层图片区域 -->

    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        //轮播图的数据列表
        swipperList: [],
        // 分类导航数据列表
        categoryNav: [],
        // 楼层区域数据列表
        FloorList: [],


      };
    },
    onLoad() {
      //调用方法，获取轮播图的数据
      this.getSwipperList()
      //调用方法获取分类导航的数据
      this.getCategoryNav()
      //调用方法获取楼层列表
      this.getFloorList()
    },
    methods: {
      //搜索
      gotoSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      },
      // 获取轮播图数据
      async getSwipperList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata');
        if (res.meta.status !== 200)
          return uni.showMsg()
        this.swipperList = res.message
      },
      //获取分类导航数据列表
      async getCategoryNav() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems');
        if (res.meta.status !== 200)
          return uni.showMsg()
        this.categoryNav = res.message
      },
      //点击分类，跳转到分类页面
      navClickhandler(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      //获取首页楼层数据
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) {
          return uni.showMsg()
        }
        //对数据进行处理
        res.message.forEach(floor=>{
          floor.product_list.forEach(prod=>{
            prod.url='/subpkg/goods-list/goods-list?'+prod.navigator_url.split('?')[1]
          })
        })
        this.FloorList = res.message
      }


    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    .swiperImg {
      width: 100%;
      height: 100%;
    }
  }
  .searchComm{
    position: sticky;
    top:0;
    z-index: 999;
  }

  .nav-list {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {

    height: 60rpx;
    width: 100%;

  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

  }

  .floor-img-box {
    display: flex;
    padding: 10rpx;
  }
</style>
