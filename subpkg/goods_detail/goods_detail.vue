<template>
	<view class="detial-container" v-if="goodsDetail">
  <!-- 详情的轮播图区域 -->
  <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
    <swiper-item v-for="(item,index) in goodsDetail.pics" :key="item.pics_id">
        <image :src="item.pics_big" mode=""  @click="preview(index)"></image>
    </swiper-item>
  </swiper>
  <!-- 详情的轮播图区域 -->
    
 <!-- 商品的介绍区域开始-->
 <view class="goods-introduce">
   <!-- 价格 -->
   <text class="price" v-if="goodsDetail">￥{{goodsDetail.goods_price}}</text>
   <!-- 价格 -->
   
  <!-- 介绍和收藏区域开始 -->
  <view class="goods-item">
 <!-- 左侧内容 -->
 <view class="item-left">
   <view class="item-name" v-if="goodsDetail">
     {{goodsDetail.goods_name}}
   </view>
 </view>
 <!-- 左侧内容 -->
 
<!-- 右侧收藏 -->
 <view class="item-right">
   <uni-icons type="star" size="20"></uni-icons>
   <text>收藏</text>
 </view>
<!-- 右侧收藏 -->
  </view>
  <!-- 介绍和收藏区域结束 -->
  
  <!-- 下方快递 -->
  <text class="yf">
    快递：免运费
  </text>
  <!-- 下方快递 -->
 </view>
 <!-- 商品的介绍区域结束 -->
 
 
 <!-- 富文本组件实现商品的详情介绍 -->
 <rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
 <!-- 富文本组件实现商品的详情介绍 -->
 
<!-- 商品导航组件 -->
<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
<!-- 商品导航组件 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品的id
        goods_id:0,
        //商品详情
        goodsDetail:null,
        //商品导航相关的组件
         options: [{
                    icon: 'shop',
                    text: '店铺',
                    // info: 2,
                    // infoBackgroundColor:'#007aff',
                    // infoColor:"red"
                }, {
                    icon: 'cart',
                    text: '购物车',
                    info: 2
                }],
                buttonGroup: [{
                  text: '加入购物车',
                  backgroundColor: '#ff0000',
                  color: '#fff'
                },
                {
                  text: '立即购买',
                  backgroundColor: '#ffa200',
                  color: '#fff'
                }
                ]
			};
		},
   methods:{
     //定义获取当前商品详情的函数
    async getGoodsDetail(){
       const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id:this.goods_id})
       // 判断是否获取数据成功
       if(res.meta.status!==200) return uni.$showMsg('获取商品详情失败!')
       // 获取成功后,将数据保存
       this.goodsDetail=res.message
         this.replaceWhite()
       // console.log(res)
       
     },
     //实现图片预览的函数
     preview(i){
       console.log(i)
       uni.previewImage({
         current: i,
         urls:this.goodsDetail.pics.map(x=>x.pics_big)
       })
     },
     // 正则替换图片几像素空白的问题
     replaceWhite(){
     this.goodsDetail.goods_introduce=this.goodsDetail.goods_introduce.replace(/<img/g,'<img style="display:block;"').replace(/webp/g,'jpg')
     },
     //左侧点击事件
     onClick(e){
        console.log(e)
        // 如果用户点击了购物车,则跳转到购物车页面
        if(e.content.text==='购物车'){
          console.log('触发了购物车按钮')
         uni.switchTab({
           url:'/pages/cart/cart'
         })
      }
   },
    onLoad(options) {
      console.log(options)
      //将当前商品id存储下拉
      this.goods_id=options.goods_id
      //调用获取商品详情的函数
      this.getGoodsDetail()
     
    }
   
	}
  }
</script>

<style lang="scss">
.detial-container{
  padding-bottom: 50px;
  swiper{
  height: 600rpx;
    // background-color: pink;
    swiper-item{
       height: 600rpx;
       background-color: #ccc;
       // background-color: green;
      image{
        width: 100%;
        height: 100%;
      }
    }
  },
  //商品的介绍和收藏样式开始
  .goods-introduce{
    padding:20rpx 10rpx;
    .price{
      color:#c00000;
      margin-bottom: 10px;
    }
    .goods-item{
      display: flex;
      justify-content: center;
      .item-left{
        flex:8;
        .item-name{
            padding-right: 10rpx;
           border-right: 2px solid #eeeeee;
           font-size: 14px;
        }
      }
      .item-right{
        box-sizing: border-box;
        flex:2;
        // background-color: green;
        display:flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        text{
          color: #ccc;
          font-size: 14px;
        }
      }
     
     
    }
  }
  //商品的介绍和收藏样式结束
  .yf{
    font-size:14px ;
    color:#CCCCCC;
  }
  //商品导航的样式
  .uni-goods-nav{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
