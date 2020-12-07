// 1 导入getters
import {mapGetters} from 'vuex'

//导出
export default {
  data(){
    
  },
  onShow(){
    //调用定义数字徽标的函数
    this.showTotal()
  },
  methods:{
    //定义tabbar的数字徽标
    showTotal(){
      // console.log('商品数量',this.total)
      uni.setTabBarBadge({
        index: 2,
        text: this.total+''
      })
    }
  },
  computed:{
    ...mapGetters('m_cart',['total'])
  },
  watch:{
    // 使用偵聽器來動態渲染購物車徽標的商品數量
    total(){
      
     this.showTotal()
    }
  }
}