<template>
  <div id="app">
    <!-- <Home /> -->
    <!--  head  -->
    <div class="head">
      <a @click="$router.go(-1)">返回</a>
      <span>移动商城</span>
    </div>
    <router-view />
  </div>
</template>

<script>
// import Home from '@/views/Home.vue'
// import home from '@/components/home/home.vue'
export default {
  name: 'app'
  // components: {
  //   // Home,
  //   home
  // }
}
</script>

<style lang="less" scoped>
  .head {
    color: #fff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #1989fa;
    a {
      font-size: 14px;
      position: absolute;
      left: 10px;
    }
    span {
      margin: 0;
      font-size: 14px;
    }
  }
</style>
