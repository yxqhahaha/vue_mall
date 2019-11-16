<template>
  <div>
    <van-list v-model="loading" :finished="finished" direction @load="onLoad" finished-text="没有更多了">
      <van-cell>

      </van-cell>
    </van-list>
    <div v-for="item in list" :key="item.id" class="image">
      <!-- 左 图片 -->
      <div>
        <img :src="item.img_url" alt="">
      </div>
      <!-- 右 -->
      <div>

      </div>
    </div>
    
  </div>

</template>

<script>
export default {
  name: 'newList',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      leng: 0,
      direction: "up"
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.get('/api/getnewslist')
      console.log(res.message);
      this.list = res.message
      this.leng = res.message.length
    },
    onLoad() {
      setTimeout(() => {
        console.log(this.leng);
        if (this.leng >= 10)
          // 加载状态结束
          this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 10) {
          this.finished = true;
        }
      }, 500);
    }

  }
}
</script>

<style lang="less" scoped>
.image {
  height: 68px;
}
</style>
