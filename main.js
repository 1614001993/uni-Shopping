import Vue from 'vue'
import App from './App'
//导入网络请求的包
import {$http} from '@escook/request-miniprogram'
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http=$http
// $http.baseUrl='https://www.uinav.com'
$http.baseUrl='https://api-hmugo-web.itheima.net'
$http.beforeRequest=function(options){
  uni.showLoading({
    title:'数据加载中...'
  })
}
$http.afterRequest=function(options){
  uni.hideLoading()
}
//封装加载失败提示消息
uni.showMsg=function(title='数据加载失败',duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
