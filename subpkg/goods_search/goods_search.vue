<template>
	<view>
    <!-- 搜索框 -->
	<view class="inp-search">
	 <uni-search-bar @confirm="search" @input="input" placeholder="请输入搜索内容" :radius="100" clearButton="auto" cancelButton="none"></uni-search-bar>
      <!-- <uni-icons type="search" size="20" ></uni-icons> -->
	</view>
   <!-- 搜索框 -->
   
   
   <!-- 搜索联想建议 -->
   <view class="search-suggestion" v-if="keyWord.trim().length">
   <view class="suggetion-item" v-for="(item) in suggetionList" :key="item.goods_id" @click="goToGoodsDetails(item)">
     <text>{{item.goods_name}}</text>
   </view>
   </view>
   <!-- 搜索联想建议 -->
   
   <!-- 搜索历史记录 -->
   <view class="search-history" v-else>
    <!-- 头部的搜索标题和删除按钮 -->
      <view class="history-top">
        <text>搜索历史</text>
       <uni-icons type="trash" size="20" @click="cleanHistory" ></uni-icons>
      </view>
    <!-- 头部的搜索标题和删除按钮 -->
    
    <!-- 历史记录的主体区域 -->
    <view class="history-item">
       <uni-tag class="tag" :text="item" v-for="(item,i) in historyList" :key="i" size="normal" @click="goToCateList(item)"></uni-tag>
    </view>
     <!-- 历史记录的主体区域 -->
   </view>
   <!-- 搜索历史记录 -->
	</view>
</template>

<script>
	export default {
    onLoad() {
      // onLoad生命周期
      this.historyList=JSON.parse(uni.getStorageSync('history') || '[]') 
    },
		data() {
			return {
				//搜索关键字
        keyWord:'',
        //定义防抖的计时器
        timer:null,
        //搜索联想建议的列表
        suggetionList:[],
        //搜索历史记录的列表
        historyList:[]
			};
		},
    methods:{
      // 监听搜索框的input事件
      input(e){
        //触发事件的时候先清理定时器
         clearTimeout(this.timer)
         // 达到间隔时间后才触发定时器函数
        this.timer=setTimeout(()=>{
          // 将e.value的值存储到keyWord
           this.keyWord=e.value
           // console.log(this.keyWord)
           //调用获取关键词条的函数
          this.getString()
        },500)
       
      },
      //根据关键词进行查询联想建议词条的函数
  async getString(){
    // 如果用户没有输入,直接return
      if(this.keyWord.trim()==='') return
         const { data:res } = await uni.$http.get('/api/public/v1/goods/qsearch',{ query:this.keyWord })
         // 如果获取失败,进行提示
         if(res.meta.status!==200) return uni.$showMsg('获取建议列表失败！')
         // 将搜索的建议存储到列表中
         this.suggetionList=res.message
      // 先做筛选重复的筛选操作，将搜索的关键字放进历史记录的列表中
      this.historyList.forEach((item,i)=>{
        if(item===this.keyWord){
          this.historyList.splice(i,1)
        }
      })
        this.historyList.unshift(this.keyWord)
         //将数据存储到storage里面
         this.saveHistoryLocal()
      },
      //跳转到商品详情页的函数
      goToGoodsDetails(item){
         console.log(item)
         uni.navigateTo({
           url:`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
         })
      },
      // 将历史记录存储到本地的方法
      saveHistoryLocal(){
        // 调用uni.setStorageSync()方法将数据存储到本地
        uni.setStorageSync('history',JSON.stringify(this.historyList))
      },
      //清空历史记录的函数
      cleanHistory(){
        //清空当前历史记录数组
        this.historyList=[]
        //清空本地stroage
        uni.setStorageSync('history',JSON.stringify([]))
      },
      //点击历史记录，跳转到商品分类页面
      goToCateList(item){
        console.log(item)
        uni.navigateTo({
          url:`/subpkg/goods_list/goods_list?query=${item}`
        })
      }
    }
    
	}

</script>

<style lang="scss">
  // 顶部搜索框的样式
.inp-search{
  position: relative;
  left: 0;
  padding:10rpx 20rpx;
  height: 100rpx;
  box-sizing: border-box;
  background-color: #c00000;
  .uni-search-bar{
     background-color: #c00000;
       height: 100rpx;
    }
    .uni-searchbar.data-v-64ee3838{
      padding: 0;
       background-color: #c00000;
    }
 
}
//搜索历史记录的样式开始
.search-history{
 .history-top{
   padding: 20rpx;
   display:flex;
   justify-content: space-between;
   border-bottom:1px solid #ccc;
 }
 .history-item{
   display: flex;
    justify-content: start;
    flex-wrap:wrap;
   .tag{
     height: 60rpx;
     margin:5px;
     background-color: pink;
   }
 }
}
//搜索历史记录的样式结束

//搜索建议列表的样式开始
 .suggetion-item{
   font-size: 14px;
   color: #333;
   border-bottom: 1px solid #ccc;
   padding: 10px;
   // 文字一行显示
   white-space: nowrap;
   //超出部分隐藏
   overflow: hidden;
   //显示省略号
   text-overflow: ellipsis;
 }
 //搜索建议列表的样式结束
</style>
