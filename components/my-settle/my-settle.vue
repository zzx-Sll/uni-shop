<template>
	<view class="settle">
	<!-- 全选按钮 -->
  <view class="radio">
    <label class="radio">
      <radio @click="changeFullChecked" value="" color="#c00000" :checked="isFullChecked" /><text>全选</text>
    </label>
  </view>
	<!-- 全选按钮结束 -->
  
  <!-- 合计区域 -->
  <view class="amount">
    合计:<text>￥{{amountPrice}}</text>
  </view>
  <!-- 合计区域结束 -->
  
  <!-- 结算区域 -->
  <view class="settle-btn">
    <text>结算({{checkedCount}})</text>
  </view>
  <!-- 结算区域结束-->
	</view>
</template>

<script>
  import {mapGetters,mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
    methods:{
      ...mapMutations('m_cart',['updateFullChecked']),
      //点击全选按钮实现商品的选择状态联动
      changeFullChecked(){
        // 改变全选按钮的状态
        // console.log('当前全选按钮的状态',this.isFullChecked)
        //调用函数，修改商品的函数
        this.updateFullChecked(!this.isFullChecked)
      }
    },
    computed:{
      ...mapGetters('m_cart',['checkedCount','total','amountPrice']),
      //动态实现全选按钮状态的函数
      isFullChecked(){
        return this.checkedCount===this.total
      },
      
    }
	}
</script>

<style lang="scss" scoped>
.settle{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
 background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 5px;
 .settle-btn{
    width: 100px;  
   height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #c00000;
    color: #fff;
  }
  .amount{
    text{
      color: #c00000;
    }
  }
}
</style>
