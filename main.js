import Vue from 'vue'
import App from './App'
//导入$http
import {$http} from '@escook/request-miniprogram'
//设置请求根路径
$http.baseUrl='http://www.uinav.com'
//将$http挂载到uni顶级对象上
uni.$http=$http
// 设置请求拦截器
$http.beforeRequest=function(options){
   uni.showLoading({
     title:'数据加载中'
   })
}
//设置响应拦截器
$http.afterRequest=function(){
  uni.hideLoading()
}
// 封装全局的uni.$show()方法就进行错误提示
uni.$showMsg=function(title){
  uni.showToast({
    duration:1500,
    title:title,
    icon:'none'
  })
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
