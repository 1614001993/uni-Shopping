<template>
  <view>
    <!-- 输入框 -->
    <view class="search">
      <uni-search-bar @input="input" radius="18" cancelButton="none"></uni-search-bar>
    </view>

    <!-- 搜索建议 -->
    <view class="suggest-list" v-if="keyworld.length!==0">
      <view class="suggest-item" v-for="(item,index) in keySuggest" :key="index" @click="gotoDetails(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="search" size="20"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clearHistoryList"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :circle="true" :inverted="true" :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        keyworld: '',
        keySuggest: [],
        error: '',
        historySear: [],

      };
    },
    computed: {
      historys() {
        return [...this.historySear].reverse()
      }
    },
    onLoad() {
      this.historySear=JSON.parse(uni.getStorageSync('keyworld') || '[]')
    },
    methods: {
      input(e) {
        //给输入事件做防抖节流处理
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.keyworld = e.value
          console.log(e.value);
          this.getKeySuggest()
        }, 500)
      },
      async getKeySuggest() {
        this.error = ''
        if (this.keyworld === '') {
          this.keySuggest = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.keyworld,
        });
        this.saveHistory()

        if (res.message.length == 0) {
          this.error = '未查询到相关商品';
          return
        }
        if (res.meta.status !== 200) {
          return uni.showMsg()
        }

        this.keySuggest = res.message
        console.log(res);
      },
      saveHistory() {
        // this.historySear.push(this.keyworld
        //将Array数组转化为set对象
        const set = new Set(this.historySear)
        //调用set对象的delete放法，如果数组里面有keyword关键字，将其删除，并调用add方法重新添加
        set.delete(this.keyworld)
        set.add(this.keyworld)
        // 重新将set对象转化为数组
        this.historySear = Array.from(set)
        //将搜索历史持久化存储到本地
        uni.setStorageSync('keyworld', JSON.stringify(this.historySear))
      },
      gotoDetails(item) {
        console.log(item.goods_id);
        uni.navigateTo({
          url: '/subpkg/goods-detail/goods-detail?goods_id=' + item.goods_id
        })
      },
      //点击历史关键词跳转到
      gotoGoodsList(kw){
        uni.navigateTo({
          url:'/subpkg/goods-list/goods-list?query='+kw
        })
        
      },
      //清空搜索列表
      clearHistoryList(){
        this.historySear=[];
        uni.removeStorageSync('keyworld')
      }
    }
  }
</script>

<style lang="scss">
  .search {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }

  .suggest-list {
    padding: 0 4px;

    .suggest-item {
      padding: 8px 8px;
      font-size: 13px;
      display: flex;
      border-bottom: 1px solid #f2f2f2;
      align-items: center;
      justify-content: space-between;

      .goods-name {
        //不换行
        white-space: nowrap;
        //溢出部分隐藏
        overflow: hidden;
        // 文本溢出后使用...替代
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }
</style>
