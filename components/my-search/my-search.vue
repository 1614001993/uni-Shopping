<template>
  <view @click="gotoSearch()" class="my-search-container" :style="{'background-color':bgcolor}">
    <view class="my-search-box" :style="{'border-radius':radius+'px'}">
      <uni-icons type="search" size="17" class="my-search-icon"></uni-icons>
      <text class="my-search-text">搜索</text>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    props:{
      //背景颜色
      bgcolor:{
        type:String,
        default:"#ff6b00"
      },
            //圆角属性
      radius:{
        type:Number,
        default:18
      }

    },
    methods:{
      gotoSearch(){
        //绑定外界绑定的事件
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .my-search-container {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;

    .my-search-box {
      width: 100%;
      height: 36px;
      background-color: #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;

      .my-search-text {
        font-size: 15px;
        margin-left:5px ;

      }

    }
  }
</style>
