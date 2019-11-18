<template>
  <div>

    <div class="title">
      <h4>{{this.goodsDescData.title}}</h4>
      <hr />
    </div>
    <div class="content" v-html="goodsDescData.content">
<!--      {{this.goodsDescData.content}}-->
    </div>
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
      let id = 87
      const { data: res } = await this.$http.get(`/api/goods/getdesc/${id}`)
      console.log(res)
      this.goodsDescData = res.message[0]
      console.log(this.goodsDescData)
    }
  },
  computed: {

  },
  created () {
    this.getGoodsDescData()
  }
}
</script>ccc

<style scoped>

  .title {
    margin: 10px 0;
    text-align: center;
    color: #226aff;
  }
  .content {
    text-align: left;
  }
</style>
