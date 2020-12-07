//导出地址模块
export default {
 namespaced:true, //开启命名空间
   state: () => ({
      // 收货地址
      address:JSON.parse(uni.getStorageSync('address') || '{}'),
    }),
  mutations:{
    //定义更新地址的函数
    updateAddress(state,address){
      // console.log('进来了')
      state.address=address
      // console.log('更新后的地址信息',state.address)
      //将地址信息存储到本地
      this.commit('m_address/saveAddress')
    },
    //将地址信息存储到本地storage中
    saveAddress(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    }
  },
  getters:{
    addstr(state) {
       if (!state.address.provinceName) return ''
       // 拼接 省，市，区，详细地址 的字符串并返回给用户
       return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
     }
  }
}