<template>
	<view class="goods-item" >
	  <!-- 商品左侧图片 -->
	  <view class="item-left" >
	    <image :src="goods.goods_big_logo ||  defaultPic" ></image>
	  </view> 
	  <!-- 商品左侧图片 -->
	   
	   <!-- 商品右侧内容 -->
	   <view class="item-right">
	    <!-- 标题 --> 
	     <view class="title">
	       {{goods.goods_name}}
	     </view>
	     <!-- 标题 -->
	     
	     <!-- 价格 -->
	     <view class="price">
	       <text>￥{{goods.goods_price | toFixed}}</text>
	     </view>
	     <!-- 价格 -->
	   </view>
	   <!-- 商品右侧内容 -->
	</view>
</template>

<script>
	export default {
    props:{
      goods:{
       type:Object,
       required:true
      }
    },
   filters:{
     toFixed(val){
       return val.toFixed(2)
     }
   },
		data() {
			return {
				//默认的图片
				 defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		}
	}
</script>

<style lang="scss">
 .goods-item{
    height: 100px;
    // background-color: pink;
    display:flex;
    justify-content: start;
    border-bottom:1px solid #ccc;
    .item-left{
      flex:3;
      image{
        width: 100%;
        height: 100%;
      }
    }
    .item-right{
      padding:10rpx 20rpx;
      flex:7;
      // background-color: green;
      display:flex;
      flex-direction: column;
      justify-content: space-between;
      .title{
        font-size: 14px;
        font-weight: 400;
      }
      text{
        font-size: 14px;
        color:#c00000;
      }
    }
  }
</style>
