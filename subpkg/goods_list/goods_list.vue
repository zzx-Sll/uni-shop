<template>
	<view class="goods-container">
	  <view v-for="(item,index) in goodsList" :key="item.goods_id" @click="goToDetail(item)">
    
    <!-- 商品列表的组件 -->
     <goods-item :goods="item"></goods-item>
    <!-- 商品列表的组件 -->
	  
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 定义参数请求对象
        queryObj:{
          //定义查询参数
          query:'',
          //商品id
          cid:null,
          //页码
          pagenum:1,
          //数据条数
          pagesize:10
        },
        //定义商品分类列表
        goodsList:[],
        //定义获取数据的总条数
        total:0,
        // 设置上拉刷新的节流阀
        reachFlag:true
       
			};
		},
    methods:{
      //获取商品列表的函数
     async getGoodsList(){
       //开启上拉加载的节流阀
       this.reachFlag=false
        const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        //判断是否获取数据成功
        if(res.meta.status!==200) return uni.$showMsg('获取商品列表数据失败！')
        //获取数据成功
        this.goodsList.push(...res.message.goods)
        this.total=res.message.total
        //开启节流阀
        this.reachFlag=true
        // console.log(res)
      },
      // 点击商品跳转到详情页
      goToDetail(item){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
        })
      }
    },
    // onLoad生命周期函数
    onLoad(options) {
      console.log(options)
      this.queryObj.query=options.query || ''
      this.queryObj.cid=options.cat_id || ''
      //调用获取商品分类的函数
       this.getGoodsList()
    },
    //上拉加载生命周期函数
    onReachBottom() {
    
      // console.log('开始拉了')
      // 判断是否开启了上拉加载的节流阀
      if(!this.reachFlag) return ''
      //判断数据是否已经获取完毕
      if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total)
      return uni.$showMsg('没有更多内容了')
        this.queryObj.pagenum++
       this.getGoodsList()
    },
    // 上拉刷新的生命周期
    onPullDownRefresh() {
    uni.showLoading({
      title:'数据加载中'
    })
      //清空数组
      this.goodsList=[]
      //重置参数
      this.queryObj.pagenum=1,
      this.total=0
       // 发起请求
       this.getGoodsList()
       // 关闭下拉刷新
       uni.stopPullDownRefresh()
       // uni.hideLoading()
       // 刷新成功后,进行提示
       // uni.$showMsg('刷新成功')
      
    }
    
    
	}
</script>

<style lang="scss">
// 商品列表的样式
.goods-container{
  
}
</style>
