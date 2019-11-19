<template>
    <!-- 图标 -->
    <van-tabbar v-model="active" >
          <van-tabbar-item icon="wap-home"     replace to="/home" >首页</van-tabbar-item>
          <van-tabbar-item icon="contact"   replace  to="/member" >会员</van-tabbar-item>
          <van-tabbar-item icon="cart-o" info="0" to="/shopcar" >购物车</van-tabbar-item>
          <van-tabbar-item icon="search" to="/search" >搜索</van-tabbar-item>
    </van-tabbar>
</template>
<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang="css" scoped>

</style>
