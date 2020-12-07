// 导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
//导入cart.js
import  moduleCart from '@/store/cart.js'
//导入address.js
import moduleAddress from '@/store/address.js'
// 将vuex注册为vue的实例
Vue.use(Vuex)

//注册vuex实例
const store=new Vuex.Store({
   modules:{
     m_cart:moduleCart,
     m_address:moduleAddress
   }
})

//导出store

export default store