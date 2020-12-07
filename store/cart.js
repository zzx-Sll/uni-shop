//购物车模块
export default {
   namespaced:true, //开启命名空间
   // 模块的 state 数据
    state: () => ({
      // 购物车的数组，用来存储购物车中每个商品的信息对象
      // 每个商品的信息对象，都包含如下 6 个属性：
      // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
      cart:JSON.parse(uni.getStorageSync('cartData') || '[]'),
    }),
   // 模块的 mutations 方法
    mutations: {
      //添加购物车的方法
      addCart(state,val){
      // console.log(val)
         // console.log(state.cart)
        const flag=state.cart.find((item)=>item.goods_id===val.goods_id) 
          // 无符合的元素,将val值push进数组
        if(!flag){
          state.cart.push(val)
        }else{
          // 有当前的元素，让当前元素的count++
          flag.goods_count++
        }
           // 实现购物车数据持久化 
          this.commit('m_cart/saveCart')
      },
      //持久化存储购物车数据
      saveCart(state,val){
      
        uni.setStorageSync('cartData',JSON.stringify(state.cart))
      
      },
      //更改购物车按钮勾选状态的函数
      updateRadio(state,goods){
        // console.log('传过来的商品详情',goods)
        // 查找是否有符合条件的元素,查找到则返回该元素
        const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
        
          // 有对应的商品信息对象
          if (findResult) {
            // 更新对应商品的勾选状态
            findResult.goods_state = goods.goods_state
            // 持久化存储到本地
            this.commit('m_cart/saveCart')
          }
      }, 
      //修改购物车商品数量的函数
      updateNum(state,goods){
        // console.log('传过来的商品详情',goods)
        // 查找是否有符合条件的元素,查找到则返回该元素
        const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
        
          // 有对应的商品信息对象
          if (findResult) {
            // 更新对应商品的勾选状态
            findResult.goods_count = goods.goods_count
            // 持久化存储到本地
            this.commit('m_cart/saveCart')
          }
      },
      //根据id将商品从购物车里删除
      removeGoodsById(state,goods_id){
        //查找返回id相等的item项
       state.cart=state.cart.filter(item=>item.goods_id!==goods_id)
         this.commit('m_cart/saveCart')
      },
      //实现全选反选的函数
      updateFullChecked(state,val){
        // console.log(val)
        state.cart.reduce((total,item)=>{
           item.goods_state=val
           return
        },0)
      // 持久化存储到本地
      this.commit('m_cart/saveCart')
      }
    },
  
    // 模块的 getters 属性
    getters: {
      //动态计算购物车的商品个数
      total(state){
      // let count=0
      // state.cart.forEach(item=>{
      //   count+=item.goods_count
      // })
     return state.cart.reduce((count,item)=>{
           return count+=item.goods_count
      },0)
      
      },
      //动态计算勾选的的商品个数
      checkedCount(state){
       // var count=0;
       //  state.cart.forEach(item=>{
       //    if(item.goods_state===true){
       //      count=item.goods_count+count
       //    }
       //  })
       //   return count
       return state.cart.filter(item=>item.goods_state).reduce((total,item)=>total+=item.goods_count,0)
      },
      //动态计算价格
      amountPrice(state){
        return state.cart.filter(item=>item.goods_state).reduce((price,item)=>{
         return price+=(item.goods_price*item.goods_count)
        },0).toFixed(2)
      }
    },
}