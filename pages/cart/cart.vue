<template>
 <!-- 購物車為空的時候展示的圖片 -->
 <view class="empty-img" v-if="cart.length===0">
   <image src="../../static/cart_empty@2x.png"></image>
   <text>空空如也</text>
 </view>
 <!-- 購物車為空的時候展示的圖片結束-->
	<view class="cart-container" v-else>
    <!-- 商品的收货地址区域 -->
    <adress>
  
    </adress>
    <image src="/static/cart_border@2x.png" class="address-border"></image>
    <!-- 商品的收货地址区域结束-->
    
		<!-- 购物车商品列表的标题区域 -->
		<view class="cart-title">
		  <!-- 左侧的图标 -->
		  <uni-icons type="shop" size="18"></uni-icons>
		  <!-- 描述文本 -->
		  <text class="cart-title-text">购物车</text>
		</view>
    
    	<!-- 购物车商品列表的标题区域结束-->
      <uni-swipe-action>
          <block class="goods-item" v-for="(item) in cart" :key="item.goods_id">
        <uni-swipe-action-item :options="options" @click="handlerSwiper(item)">
            <goods-item :showNumBox="true" :radioShow="true" :goods="item" @radio-change="changeRadio" @change-num="numBoxHandler"></goods-item>
        </uni-swipe-action-item>
         </block>
      </uni-swipe-action>
      <!-- 购物车商品展示区域 -->
    
      
     
      <!-- 购物车商品展示区域结束 -->
      <!-- 结算区域 -->
      <my-settle></my-settle>
      <!-- 结算区域结束 -->
	</view>
</template>

<script>
  // 导入mixins
  import tabbadge from '@/mixins/tabbar-badge'
  //导入mapState
  import {mapState,mapMutations} from 'vuex'
	export default {
  // 设置mixins节点
    mixins:[tabbadge],
		data() {
			return {
				//定义滑动删除按钮的options
        options:[{
            text: '删除',
            style: {
                backgroundColor: '#c00000'
            }
        }]
			};
		},
    computed:{
      ...mapState('m_cart',['cart']),
     
    },
    methods:{
      ...mapMutations('m_cart',['updateRadio','updateNum','removeGoodsById']),
      // 改变按钮状态的属性
      changeRadio(e){
        //调用处理按钮状态的方法
          // console.log(e)
        this.updateRadio(e)
      },
      // 改变商品数字框的数值处理函数
      numBoxHandler(e){
        // console.log(e)
        //调用方法，修改商品购物车的数量
         this.updateNum(e)
      },
      //处理删除商品的函数
      handlerSwiper(goods){
        // console.log(goods)
        this.removeGoodsById(goods.goods_id)
      }
    }
	}
</script>

<style lang="scss">
  .cart-container{
    padding-bottom: 50px;
  }
  //收货地址的边框图片样式
  .address-border{
    display: block;
    width: 100%;
    height: 5px;
  }
    
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
.empty-img{
  margin: 50px auto;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: space-around;
  image{
    width: 140px;
    height: 140px;
  }
}
</style>
