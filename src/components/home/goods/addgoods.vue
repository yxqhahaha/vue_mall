<template>
    <div style="padding: 0px 10px">
      <van-field
        v-model="value"
        placeholder="请输入商品名称"
      />
      <van-button class="addBtn" type="info" size="large" @click.prevent="addGoods()">添加商品</van-button>
    </div>
</template>

<script>
export default {
  name: 'addgoods',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    addGoods () {
      this.$notify({ type: 'success', duration: 800, message: '添加成功' })
      this.$http.post('/api/addproduct', { name: this.value }).then(this.toSearch())
    },
    toSearch () {
      this.$router.push({
        path: '/search'
      })
    }
  }
}
</script>

<style lang="less" scoped>
div {
  margin-top: 70px;
}
.addBtn{
    margin: 40px 0;
    font-weight: bold;
}
</style>
