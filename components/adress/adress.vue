<template>
	<view>
    <!-- 收货地址的盒子区域 -->
		<view class="address-box" v-if="JSON.stringify(address)==='{}'" >
		   <button type="primary" @click="getAddressInfo">请选择收货地址 +</button>
		</view>
     <!-- 收货地址的盒子区域结束 -->
     
     <!-- 收货地址的详情区域 -->
     <view class="address-info" v-else @click="getAddressInfo">
     <!-- 收货人的名字和电话 -->
     <view class="row-person">
       <text>收货人:{{address.userName}}</text> 
      <view class="phone">
         <text>电话:{{address.telNumber}} </text> <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
     </view>
     <!-- 收货人的名字和电话结束 -->
   
     <!-- 收货地址 -->
     <view class="row-address">
         <text>收货地址：</text>
         <text>{{addstr}}</text>
     </view>
     <!-- 收货地址结束 -->
     </view>
     <!-- 收货地址的详情区域结束 -->
	</view>
</template>

<script>
 import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				//收货地址的的对象
        // address:{
        
        // }
			};
		},
    computed:{
         ...mapState('m_address',['address']),
         ...mapGetters('m_address',['addstr'])
    },
    methods:{
      //导入mutations中的函数
      ...mapMutations('m_address',['updateAddress']),
      // 获取收货地址信息的函数
     async getAddressInfo(){
       // console.log(11)
    const [err,succ]=await uni.chooseAddress().catch(err=>err)
      console.log(err)
    // 判断是否获取地址成功
    if(err===null && succ.errMsg==='chooseAddress:ok'){
      //获取地址信息成功，将地址保存下来
      // this.address=succ
      this.updateAddress(succ)
    }
   if(err&&(err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')){
      //用户取消了授权，重新调用接口
   
      this.reAuth()
    }
      },
      //提示用户重新授权的函数
      reAuth(){
        uni.showModal({
           title: '提示',
           content: '您当前未授权地址信息，请授权',
            success:(res)=>{
              // console.log(res)
              if(res.cancel===true){
                return uni.$showMsg('已取消授权')
              }
              if(res.confirm===true){
                console.log(11)
              return uni.openSetting({
                  // 3.4.1 授权结束，需要对授权的结果做进一步判断
                  success: (settingResult) => {
                    // 3.4.2 地址授权的值等于 true，提示用户 “授权成功”
                    if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
                    // 3.4.3 地址授权的值等于 false，提示用户 “您取消了地址授权”
                    if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
                  },
                  fail: (res) => {
                    console.log('授权失败',res)
                  }
                })
            
              }
            }
        })
      }
    },
  
   
	}
</script>

<style lang="scss">
// 收货地址的样式
.address-box{
  display:flex;
  align-items: center;
  justify-content: center;
   height: 90px;

  button{
   
  }
}
// 收货地址的样式结束

// 收货的详情
.address-info{
  
  height: 90px;
  // background-color: pink;
  display:flex;
  flex-direction:column;
  justify-content: center;
  padding: 5px;
  font-size: 12px;
  .row-person{
    // background-color: green;
    display: flex;
    justify-content: space-between;
  }
  .row-address{
    margin-top: 5px;
    display: flex;
    align-items: center;
    text:nth-child(1){
      display: flex;
      white-space: nowrap;
    }
    // text:nth-child(2)
  }
}
// 收货的详情结束

</style>
