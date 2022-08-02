<template>
  <view>
    <view class="goods-item">
      <!-- 图片区域 -->
      <view class="goods-item-left">
        <image :src="item.goods_big_logo||defalutPic" class="goods-pic"></image>
      </view>
      <!-- 信息区域 -->
      <view class="goods-item-right">
        <view class="goods-name">
          {{item.goods_name}}
        </view>
        <view class="goods-info-box">
          <view class="goods-price">
            ￥{{item.goods_price | tofixed}}
          </view>
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      item:{
        type:Object,
        default:{}
      }
    },
    data() {
      return {
               defalutPic: 'https://xd-class-1312285301.cos.ap-shanghai.myqcloud.com/courseProject/电视.jpeg'
      };
    },
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
    .goods-item {
      display: flex;
      padding: 10px 5px;
      border-bottom: 1px solid #f0f0f0;

      .goods-item-left {
        margin-right: 5px;

        .goods-pic {
          width: 100px;
          height: 100px;
          display: block;
        }

      }

      .goods-item-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .goods-name {
          font-size: 13px;
        }

        .goods-info-box {
          .goods-price {
            color: #C00000;
            font-size: 16px;

          }
        }
      }

    }
</style>