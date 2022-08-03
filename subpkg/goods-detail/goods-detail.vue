<template>
  <view v-if="goodsInfo.goods_name" class="goods-centerbody">
    <view class="goods-info-cont">
      <!-- 轮播图组件 -->
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"
        class="swiperpic">
        <swiper-item v-for="(item,index) in  goodsInfo.pics" :key="index">
          <image :src="item.pics_big" class="swiper-pic" @click="preview(index)"></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">
        ￥{{goodsInfo.goods_price}}
      </view>
      <!-- 信息主题区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="name">
          {{goodsInfo.goods_name}}
        </view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"> </uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="sendmoney">
        快递：免运费
      </view>
      <!-- <rich-text :nodes=""></rich-text> -->
    </view>
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    <view class="goods_nav">
      <uni-goods-nav class="nav-click" :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          icon: 'shop',
          text: '店铺'
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        buttonGroup: [{
          'text': '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        }, {
          'text': '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }],
        goodsInfo: {

        },
        goodsdetail: []
      }
    },
    onLoad(options) {
      console.log(options);
      const goods_id = options.goods_id
      this.getgoodsDetail(goods_id)

    },
    methods: {
      onClick(e){
        console.log(e);
        if(e.content.text==='购物车'){
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      },
      buttonClick(e){
        console.log(e);
      },
      async getgoodsDetail(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        console.log(res);
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"')
          .replace(/webp/g, 'jpg')
        this.goodsInfo = res.message
      },
      preview(index) {
        uni.previewImage({
          // 默认显示图片的索引
          current: index,
          //所有图片的数组
          urls: this.goodsInfo.pics.map(x => x.pics_big)
        })
      },
      // 详情页图片替换

    }
  }
</script>

<style lang="scss">
  .goods-centerbody{
    padding-bottom:50px;
    .swiperpic {
        height: 750rpx;
    
        .swiper-pic {
          font-size: 30px;
          width: 100%;
          height: 100%;
        }
      }
    
      .goods-info-box {
        padding: 10px;
        margin-right: 0px;
        margin-bottom: 27px;
    
        .price {
          color: #c00000;
          font-size: 18px;
          margin: 10px 0;
        }
    
        .goods-info-body {
          display: flex;
          justify-content: space-between;
    
          .name {
            font-size: 13px;
            margin-right: 10px;
          }
    
          .favi {
            width: 120px;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-left: 1px solid #efefef;
            color: gray;
          }
        }
    
        .sendmoney {
          font-size: 12px;
          color: gray;
          margin: 10px 0;
        }
      }
      .goods_nav{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
      }
  }
</style>
