<template>
    <div>
     <!-- <headers></headers> -->
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000" indicator-color="white" class="swipe">
           <van-swipe-item v-for="item in swipeImgs" :key="item.id"><img :src="item.img" alt="" class="swipeImg" ></van-swipe-item>
      </van-swipe>

      <!-- 宫格 -->
      <van-grid :border="false" :column-num="3">
          <van-grid-item @click="changeURL('/newlist')">
            <img src="../../../public/menu/menu1.png" class="gridIcon">
            <p class="nav">新闻资讯</p>
          </van-grid-item>
          <van-grid-item @click="changeURL('/photo/list')">
            <img src="../../../public/menu/menu2.png" class="gridIcon">
            <p class="nav">图片分享</p>
          </van-grid-item>
          <van-grid-item @click="changeURL('/goods/list')">
            <img src="../../../public/menu/menu3.png" class="gridIcon">
            <p class="nav">商品购买</p>
          </van-grid-item>
      </van-grid>
      <van-grid :border="false" :column-num="3">
          <van-grid-item>
            <img src="../../../public/menu/menu4.png" class="gridIcon">
            <p class="nav">留言反馈</p>
          </van-grid-item>
          <van-grid-item>
            <img src="../../../public/menu/menu5.png" class="gridIcon">
            <p class="nav">视频专区</p>
          </van-grid-item>
          <van-grid-item>
            <img src="../../../public/menu/menu6.png" class="gridIcon">
            <p class="nav">联系我们</p>
          </van-grid-item>
      </van-grid>
      <!-- <footers></footers> -->

        <!-- <goodsList /> -->
        <!-- <newList /> -->
        <!-- <photoList /> -->
    </div>
</template>

<script>
// import goodsList from './goods/goodsList'
// import newList from './news/newList'
// import photoList from './photo/photoList'
// import headers from './header'
// import footers from './footer'
export default {
  data () {
    return {
      swipeImgs: []
    }
  },
  methods: {
    changeURL (url) {
      this.$router.push(url)
    },
    async getSwipeIMG () {
      let res = await this.$http.get('/api/getlunbo')
      this.swipeImgs = res.data.message
    }
  },
  created () {
    this.getSwipeIMG()
  },
  name: 'home'
  // components: {
  //   headers:headers,
  //   footers:footers
  // }
}
</script>

<style lang="css" scoped>

.van-swipe{
  margin-top: 40px!important;
  width: 100%;
  height: 200px;

}
.swipeImg{
  width: 100%;
  height: 200px;
}
.gridIcon{

  width: 60px;
  height: 60px;
}
.nav{
  width: 80px;
  height: 20px;
  color: #000;
  font-size: 14px;
  margin:14px 0;
  line-height: 20px;
  text-align: center;
}
</style>
