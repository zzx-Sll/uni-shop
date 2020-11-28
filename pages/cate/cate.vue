<template>
	<view>
  <!-- 滚动区域 -->
  <view class="scroll">
    <!-- 左侧滚动区域 -->
    <scroll-view scroll-y="true" :style="{height:windowHeight+'px'}" class="scroll-left">
      <view :class="{'scorll-left-item':true,'active':activeIndex===index }" v-for="(item,index) in cateList" :key="item.cat_id"@click="toggleCate(item,index)">{{item.cat_name}}</view> 
     
    </scroll-view>
    <!-- 左侧滚动区域 -->
    
    <!-- 右侧滚动区域 -->
    <scroll-view scroll-y="true" :style="{height:windowHeight+'px'}" class="scroll-right" :scroll-top="scrollTop">
     <!-- 右侧的二级分类 -->
      <view class="scroll-right-item" v-for="(item,index) in cateLevel2" :key="item.cat_id"> <text class="cate2-name">/ {{item.cat_name}} /</text>
    <view class="scroll-item-down">
      <!-- 三级分分类 -->
      <view class="scroll-right-item-cate3" v-for="(citem,i) in item.children" :key="citem.cat_id">
        <!-- 三级分类的图片 -->
        <view class="cate3-img" @click="goToCateList(citem)">
          <image :src="citem.cat_icon" mode="widthFix"></image>
        </view>
        <!-- 三级分类的图片 -->
        
        <!-- 三级分类的类名 -->
        <view class="cate3-name">
          <text class="cate3-fz">{{citem.cat_name}}</text>
        </view>
        <!-- 三级分类的类名 -->
      </view>
      <!-- 三级分分类 -->
      </view>
      </view> 
     <!-- 右侧的二级分类 -->
     
    </scroll-view>
    <!-- 右侧滚动区域 -->
  </view>
  <!-- 滚动区域 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
        //当前设备可用的高度
				windowHeight:null,
        //一级分类的列表
        cateList:[],
        // 二级分类的列表
        cateLevel2:[],
        // 需要高亮的索引
        activeIndex:0,
        //滚动条距离顶部的距离
        scrollTop:0
			};
    
		},
    onLoad(){
      //调用获取当前设备信息的api
      uni.getSystemInfo({
         success:(res)=>{
           // console.log(res)
           //将设备的可用高度存储到本地
           this.windowHeight=res.windowHeight
         },
      }),
      //调取获取商品分类列表的函数
      this.getCateList()
    },
    methods:{
      //定义获取分类列表的函数
     async getCateList(){
        const {data:res}=await uni.$http.get('/api/public/v1/categories')
        // 获取分类失败,提醒用户
        if(res.meta.status!==200) return uni.$showMsg('获取分类列表参数失败!')
        //获取分类参数成功,将数据存储下来
        this.cateList=res.message
        // console.log('分类商品列表',res)
        //存储二级分类列表
        this.cateLevel2=res.message[0].children
      },
      //切换商品分类的函数
      toggleCate(item,index){
        // console.log(item,index)
        //切换高亮的样式
        this.activeIndex=index
        //存储二级分类列表
        this.cateLevel2=item.children
        //重置scrollTop
        this.scrollTop=this.scrollTop===0?1:0
      },
      //点击跳转到三级分类列表的函数
      goToCateList(citem){
        console.log('三级分类商品列表',citem)
        // 跳转到三级分类的商品列表
        wx.navigateTo({
          url:`/subpkg/goods_list/goods_list?cat_id=${citem.cat_id}`
        })
      }
    }
	}
</script>

<style lang="scss">
.scroll{
  display: flex;
  //左侧滚动区域的样式
  .scroll-left{
    width: 250rpx;
    background-color: #f7f7f7;
    line-height: 60px;
    .scorll-left-item{
      position: relative;
      text-align: center;
      &.active{
        background-color: #FFFFFF;
        &::before{
          content: ' ';
          display: block;
          height: 30px;
          width: 5px;
          background-color: #c00000;
          position: absolute;
          top:50%;
          left: 0;
          transform:translateY(-50%);
          
        }
      }
    }
  }
  //右侧滚动区域的样式
  .scroll-right{
    // background-color: green;
    .scroll-right-item{
      padding-top:20px;
      text-align: center;
      .cate2-name{
        text-align: center;
        font-weight:700;
      }
       .scroll-item-down{
         margin-top: 20px;
         display: flex;
         flex-wrap: wrap;
         justify-content: start;
         .scroll-right-item-cate3{
           box-sizing: border-box;
           width: 33.333%;
           height: 230rpx;
           padding: 20px 0 0 0;
           // border: 1px solid #333;
           // background-color: pink;
           display: flex;
           flex-direction: column;
           justify-content: space-between;
           // align-items: center;
           .cate3-img{
             image{
               text-align: center;
               width:80%;
             }
           }
         }
       }
    }
  }
}
 .cate3-name{
               .cate3-fz{
                 font-size: 12px;
                 font-weight: 400;
               }
             }
</style>
