<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>hello post-chen</h1>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-button plain type="primary">朴素按钮</van-button>
    <van-button plain type="info">朴素按钮</van-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  methods: {
    getInfo () {
      this.$http.get('/api/getlunbo').then(this.getInfoSucc)
    },
    getInfoSucc (res) {
      // if (res.code === 200)
      //   this.data = res.data
      // } else {
      //   console.log(res.code)
      // }
      console.log(res.data)
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>

<style lang="less" scope>
</style>
