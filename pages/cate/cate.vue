<template>
  <view>
    <!-- 一级滚动菜单 -->
    <view class="scroll-view-container">
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height:windowHeight+'px'}">
        <block v-for="(item,index) in cateList" :key="index">
          <view :class="['left-scroll-view-item',index===active?'active':'']" @click="activeChange(index)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 二级菜单 -->
      <scroll-view class="right-scroll-view" scroll-y="true" :style="{height:windowHeight+'px'}" :scroll-top="scrolltop">
        <view v-for="(item,index) in catelist2" :key="index" class="cate-lv2">
          <view class="cate-lv2-title">{{item.cat_name}}</view>
          <!-- 动态渲染三级列表 -->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item,index) in item.children" :key="index" @click="gotoGoodsList(item)">
              <!-- 商品图片 -->
              <image :src="item.cat_icon" mode="" class="cate-lv3-img"></image>
              <!-- 商品名称 -->
              <text class="cate-lv3-text">{{item.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        windowHeight: 0,
        windowWeight: 0,
        //分类数据的列表
        cateList: [],
        catelist2: [],
        catelist3: [],
        active: 0,
        //滚动条距离
        scrolltop:0

      };
    },
    onLoad() {
      const sysinfo = uni.getSystemInfoSync();
      this.windowHeight = sysinfo.windowHeight
      this.windowWeight = sysinfo.windowWidth;
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories');
        console.log(res);
        if (res.meta.status !== 200) {
          return uni.showMsg()
        }
        this.cateList = res.message
        this.catelist2 = res.message[0].children

      },
      activeChange(i) {
        this.active = i
        this.catelist2 = this.cateList[i].children
        this.scrolltop=this.scrolltop===0?1:0

      },
      gotoGoodsList(item){
        uni.navigateTo({
          url:'/subpkg/goods-list/goods-list?cid='+item.cat_id
        })
      }
    },
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        background-color: #dee7f7;
        line-height: 50px;
        text-align: center;
        font-size: 12px;
        border: 1px solid #e4c2ff;

        &.active {
          background-color: #faefff;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 3px;
            height: 25px;
            background-color: #C00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }

    .right-scroll-view {
      .cate-lv2 {
        .cate-lv2-title {
          font-size: 12px;
          text-align: center;
          font-weight: bolder;
          padding: 15px 0;
          background-color: #F8F8F8;
        }

        .cate-lv3-list {
          display: flex;
          flex-wrap: wrap;

          .cate-lv3-item {
            width: 33.33%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .cate-lv3-img {
              width: 60px;
              height: 60px;
              margin: 10px 0px;
            }
            .cate-lv3-text{
              font-size: 12px;
              text-align: center;
            }

          }

        }
      }
    }
  }
</style>
