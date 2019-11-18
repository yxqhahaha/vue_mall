<template>
    <!-- 图标 -->
    <van-tabbar v-model="active" @change="tabChange">
          <van-tabbar-item icon="wap-home"     replace to="/home" >首页</van-tabbar-item>
          <van-tabbar-item icon="contact"   replace  to="/member" >会员</van-tabbar-item>
          <van-tabbar-item icon="cart-o" info="0" to="/shopcar" >购物车</van-tabbar-item>
          <van-tabbar-item icon="search" to="/search" >搜索</van-tabbar-item>
    </van-tabbar>
</template>
<script>
export default {
    data(){
        return{
           active: 0,
             
        }
    },
    methods: {
    //   changeURL (url) {
    //       window.localStorage.setItem('active',this.active)
    //   }
    tabChange(){
        
        
    }
    },
    created() {

  
        
    },
    mounted() {
        // if(window.localStorage.getItem('active')){
        //     this.active=window.localStorage.getItem('active')
        // }else{
        //     this.active=0

        // }
        console.log( this.active);
        
        //       this.active = window.localStorage.getItem('active');
        // console.log(this.active);

    },
    computed: {
        
    },
    component: {

    }

}
</script>
<style lang="css" scoped>
    
</style>