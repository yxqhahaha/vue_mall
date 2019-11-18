<template>

  <div class="title">
    <span @click="back">
      <i v-if="nowURL === '#/home'"></i>
      <i v-else>返回</i>
    </span>
    <span>
      黑马程序员.vant
    </span>
  </div>

</template>

<script>
export default {
  data () {
    return {
      nowURL: ''  
    }
  },
  methods: {
    back() {     
      this.$router.go(-1)
    }
  },
  created() {
    this.nowURL = window.location.hash
    console.log(this.nowURL);
  }
}
</script>

<style lang="css" scoped>
.title {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #1989fa;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #fff;
  z-index: 999;
}
.title i {
  position: absolute;
  left: 20px;
  font-style: normal;
}
</style>