<template>
	<view class="goods-item" >
	  <!-- 商品左侧图片 -->
	  <view class="item-left" >
      <radio :checked="goods.goods_state" color="#c00000" v-if="radioShow" @click="changeRadio"></radio>
	    <image :src="goods.goods_small_log ||  defaultPic" ></image>
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
         <!-- 数字框 -->
           <uni-number-box :min="1" :value="goods.goods_count" v-if="showNumBox" @change="bindChange"></uni-number-box>
         <!-- 数字框 -->
	     </view>
	     <!-- 价格 -->
       
      
	   </view>
	   <!-- 商品右侧内容 -->
	</view>
</template>

<script>
	export default {
    props:{
      //传入的商品详情
      goods:{
       type:Object,
       required:true
      },
      // 是否显示勾选按钮
      radioShow:{
        type:Boolean,
        default:false
      },
      // 是否显示数字框
      showNumBox:{
        type:Boolean,
        default:false
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
		},
    methods:{
      // 修改按钮状态的函数
      changeRadio(){
        // console.log('当前的商品',this.goods.goods_state)
       // 通知父组件,改变radio的值
       this.$emit('radio-change',{
      // 商品的 Id
      goods_id: this.goods.goods_id,
      // 商品最新的勾选状态
      goods_state: !this.goods.goods_state
    })
      },
      //修改商品数量的函数
      bindChange(val){
        // console.log(val-0)
        //通知父组件，修改当前数字框的值
        this.$emit('change-num',{
          goods_id:this.goods.goods_id,
          goods_count:val-0
        })
      }
    }
	}
</script>

<style lang="scss">
 .goods-item{
    height: 120px;
    box-sizing: border-box;
    // background-color: pink;
    display:flex;
    justify-content: start;
    border-bottom:1px solid #ccc;
    padding-bottom:10px;
    .item-left{
      padding:  10rpx;
      display:flex;
      justify-content: space-between;
      align-items: center;
      flex:4;
      image{
        width: 100%;
        height: 100%;
      }
    }
    .item-right{
      padding:10rpx 20rpx;
      flex:6;
      // background-color: green;
      display:flex;
      flex-direction: column;
      justify-content: space-between;
      .title{
        font-size: 12px;
        font-weight: 400;
      }
      text{
        font-size: 14px;
        color:#c00000;
      }
      .price{
        display:flex;
        justify-content: space-between;
        align-items: center;
        .uni-numbox {
          height: 50px;
        }
      }
    }
  }
</style>
