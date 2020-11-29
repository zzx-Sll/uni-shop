<template>
	<view>
	 <view class="search-div" :style="{'background-color':bgcolor}">
	   <button type="default" class="search-btn" :style="{'border-radius':bgradius+'px'}" @click="goToSearch">
       <uni-icons type="search" size="20" ></uni-icons>
       <text>搜索</text>
     </button>
	 </view>
	</view>
</template>

<script>
	export default {
    props:{
      bgcolor:{
        type:String,
        default:'#c00000'
      },
      bgradius:{
         type:Number,
         default:25
      }
    },
		data() {
			return {
				
			};
		},
   methods:{
     //定义跳转到搜索分包的函数
     goToSearch(){
       //跳转到搜索分包
      uni.navigateTo({
         url:'/subpkg/goods_search/goods_search'
       })
     }
   }
	}
</script>

<style lang="scss">
// 搜索盒子的样式
.search-div{
  padding:10rpx 20rpx;
  height: 100rpx;
  box-sizing: border-box;
  // background-color: #c00000;
  border: unset;
  .search-btn{
    height: 80rpx;
    line-height: 80rpx;
    // border-radius: 25px;
    uni-icons{
      vertical-align: middle;
    }
    text{
      margin-left: 5rpx;
    }
  }
}
// 搜索盒子的样式
</style>
