<template>
  <div>
    <div class="man">
      <van-tabs v-model="active">
        <van-tab :title="item.title" v-for="(item, index) in photoTabeList" :key="index">{{ item.title }}</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "photoList",
  data() {
    return {
      photoTabeList: [],
      id: 0,
      active: 2
    };
  },
  methods: {
    getInfo() {
      this.$http.get(`/api/getimgcategory`).then(this.getInfoSucc);
    },
    getInfoSucc(res) {
      // if (res.code === 200)
      //   this.data = res.data
      // } else {
      //   console.log(res.code)
      // }
      console.log(res);
      this.photoTabeList = res.data.message;
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>

<style lang="less" scoped>
.main{
  padding:10px 10px
}
</style>
