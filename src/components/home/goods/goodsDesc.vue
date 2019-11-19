<template>
  <div class="main-box">
    <div class="title">
      <h4>{{this.goodsDescData.title}}</h4>
      <hr />
    </div>
    <van-row type="flex">
      <van-col span="24">
        <div class="content" v-html="goodsDescData.content">
          <!--      {{this.goodsDescData.content}}-->
        </div>
      </van-col>
    </van-row>
    <!--  展示图片  -->
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'goodsDesc',
  data () {
    return {
      goodsDescData: { }
    }
  },
  methods: {
    async getGoodsDescData () {
      // console.log(123)
      let id = this.$store.state.goodsId
      const { data: res } = await this.$http.get(`/api/goods/getdesc/${id}`)
      // console.log(res)
      this.goodsDescData = res.message[0]
      // console.log(this.goodsDescData)
    }
  },
  computed: {

  },
  created () {
    this.getGoodsDescData()
  }
}
</script>ccc

<style lang="less" scoped>
  .main-box {
    width: 100%;
    height: 100%;
    margin-top: 45px;
    .title {
      margin: 10px 0;
      text-align: center;
      color: #226aff;
    }
    margin-top: 45px;
    .content {
      width: 100%;
      text-align: left;
      img {
        width: 200px;
      }
    }
  }
</style>
