<template class="home-container">
	<view>
    <!-- 搜索组件 -->
    <my-search></my-search>
    <!-- 搜索组件 -->
	   <!-- 首页轮播图区域 -->
     <swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" class="home-swiper" indicator-active-color="#c00000">
       <swiper-item v-for="(item) in swiperList" :key="item.goods_id">
     <navigator :url="`/subpkg/goods_detial/goods_detial?goods_id=${item.goods_id}`"  class="swiper-item">
         <image :src="item.image_src"></image>
     </navigator>
       </swiper-item>
     </swiper>
	   <!-- 首页轮播图区域 -->
     
     <!-- 分类导航区域 -->
     <view class="nav_cate">
       <view class="nav_item" v-for="(item,index) in cateNavList" :key="index" @click="goCate(item)">
       <!-- 分类图片 -->
       <view class="cate_img">
     <image :src="item.image_src" mode=""></image>
       </view>
       <!-- 分类图片 -->
       </view>
     </view>
     <!-- 分类导航区域 -->
     
     <!-- 首页的楼层区域 -->
     <view class="nav_floor">
   <view class="floor_item" v-for="(item,index) in floorList" :key="index">
     <!-- 楼层的头部区域 -->
      <view class="floor_top">
        <image :src="item.floor_title.image_src"></image>
      </view> 
      <!-- 楼层的头部区域 -->
     
     <!-- 楼层的底部区域 -->
     <view class="floor_footer">
      <!-- 左侧大图 -->
      <navigator class="footer_left" :url="`/subpkg/goods_list/goods_list?${item.product_list[0].prod_url}`">
        <image :src="item.product_list[0].image_src" m ></image>
      </navigator> 
      <!-- 左侧大图 -->
      
       <!-- 右侧小图 -->
       <view class="footer_right">
         <navigator class="mini-img" v-for="(citem,i) in item.product_list" :key="i" v-if="i>0" :url="`/subpkg/goods_list/goods_list?${citem.prod_url}`">
           <image :src="citem.image_src" ></image>
         </navigator >
       </view>
       <!-- 右侧小图 -->
     </view> 
     <!-- 楼层的底部区域 -->
   </view>
     </view>
     <!-- 首页的楼层区域 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//定义轮播图列表
        swiperList:[],
        //定义分类导航的列表
        cateNavList:[],
        //定义楼层列表
        floorList:[]
			};
		},
    //页面加载时的函数
    onLoad() {
      //调用获取轮播图数据的函数
      this.getSwiperList()
      //调用获取分类导航列表的函数
      this.getCateNavList()
      // 调用获取楼层列表的函数
      this.getFloorList()
    },
    methods:{
      //定义获取轮播图的函数
      async getSwiperList(){
        const {data:res}=await uni.$http.get('/api/public/v1/home/swiperdata')
        // 获取失败对用户进行提示
        if(res.meta.status!==200) return uni.$showMsg('轮播图加载失败')
          // 获取成功对用户进行提示
      uni.$showMsg('轮播图加载成功')
          // console.log(res)
          // 将数据存储到swiperlist列表
          this.swiperList=res.message
      },
      
      //定义获取分类导航的函数
     async getCateNavList(){
        const {data:res}=await uni.$http.get("/api/public/v1/home/catitems")
        // 如果获取失败,提示用户
        if(res.meta.status!==200) return uni.$showMsg('获取分类导航失败')
        // 获取分类导航成功，将数据保存到本地
        this.cateNavList=res.message
        // console.log('分类导航的数据',res)
      },
      //定义跳转到分类页面的函数
      goCate(item){
        console.log(item)
        // 根据item的name来决定跳转的路径
        if(item.name==='分类'){
          //跳转到tabBar的分类页面
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
      // 定义获取首页楼层列表的函数
     async getFloorList(){
        const {data:res}=await uni.$http.get('/api/public/v1/home/floordata')
        // 对请求是否成功进行判断
        if(res.meta.status!==200) return uni.$showMsg('获取楼层数据失败')
        // 将楼层数据存储到本地
        
        this.floorList=res.message
        //双重forEach循环遍历数组设置
        this.floorList.forEach(floor=>{
          // console.log(floor)
          floor.product_list.forEach(item=>{
            item.prod_url=item.navigator_url.split('?')[1]
            // console.log(item.prod_url)
          })
        })
        // console.log(res)
      }
    }
	}
</script>

<style lang="scss">
  // 轮播图样式
.home-swiper{
  height: 330rpx;
  // background-color: pink;
  margin: 0 auto;
   .swiper-item { 
     width: 100%;
     height: 100%;
     // background-color: green;
     image{
       width: 100%;
       height: 100%;
     }
   }
  
}
 // 轮播图样式结束
 // 分类导航的样式开始
   .nav_cate{
    padding:0rpx 20rpx;
     height: 160rpx;
     // background-color: pink;
     display: flex;
     justify-content: space-between;
     .nav_item{
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       width: 140rpx;
       // background-color: green;
       .cate_img{
         width: 120rpx;
         height: 120rpx;
         image{
           width: 100%;
           height: 100%;
         }
       }
     }
   }
   // 分类导航的样式结束
   
   // 首页楼层区域样式开始
   .nav_floor{
    .floor_item{
      box-sizing: border-box;
      height:560rpx;
      // background-color: pink;
      margin: 5rpx 0;
      .floor_top{
        image{
          height:60rpx;
        }
      }
      .floor_footer{
        display: flex;
        height: 500rpx;
        justify-content: start;
        .footer_left{
          flex: 3;
          // background-color: pink;
          padding: 10rpx 10rpx 20rpx 10rpx;
          image{
            width: 100%;
            height: 98%;
          
          }
        }
        .footer_right{
          flex: 7;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
            padding: 10rpx;
          // background-color:green;
         
          .mini-img{
            box-sizing: border-box;
          
            width:48%;
            padding:0 0 10px 0;
            image{
              width: 100%;
                height: 100%;
            }
          }
          
        }
      }
     
    }
     }
   // 首页楼层区域样式结束
   .my-search{
     //实现吸顶效果
     position: sticky;
     top: 0;
     z-index: 999;
   }
</style>
