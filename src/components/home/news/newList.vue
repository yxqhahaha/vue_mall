<template>
  <div class="container">
    <van-loading type="spinner" color="#1989fa" v-show="!show" class="spinner" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div v-show="show">
        <div class="box" v-for="item in list" :key="item.id">
          <div class="box-z" @click="skip(item.id)">
            <!-- 图片 -->
            <div class="box-l">
              <img :src="item.img_url" />
            </div>
            <!-- 标题 -->
            <div class="title">
              <div class="hide">
                <div class="title-r">{{ item.title }}</div>
              </div>
              <div class="titleTop">
                <div class="titleTop-l">发表时间：{{ item.add_time | dateFormat }}</div>
                <div class="titleTop-r">点击：{{ item.click }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <!-- 数据 -->
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'newList',
  data () {
    return {
      list: [],
      isLoading: true,
      show: false
    }
  },
  created () {
    // this.$store.dispatch('gitInfo')
    this.getList()
  },
  methods: {
    // 获取数据
    async getList () {
      const { data: res } = await this.$http.get('/api/getnewslist')
      console.log(res.message)
      this.list = res.message
    },

    // 刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.show = true
        this.getList()
      }, 1000)
    },
    // 跳转页面
    skip (id) {
      // this.$emit('id', id)
      // this.$router.push(`/news/detail/${id}`)
      this.$router.push({ path: '/news/detail', query: { id } })
    }
  },
  mounted () {
    this.onRefresh()
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.spinner {
  margin-top: 40px;
  text-align: center;
}
.van-pull-refresh {
  margin-top: 40px;
}
.box {
  height: 47px;
  border-bottom: 1px solid #ccc;
  padding: 10px 10px;
}
.box-z {
  height: 47px;
  padding: 0 10px;
}
.box-l {
  float: left;
  width: 42px;
  height: 42px;
  margin-right: 10px;
}
.box-l img {
  width: 42px;
  height: 42px;
}
.title {
  float: left;
  width: 283px;
}
.hide {
  height: 17px;
  overflow: hidden;
}
.title-r {
  float: left;
  font-size: 14px;
  font-weight: 700;
}

.titleTop {
  height: 30px;
}
.titleTop-l {
  float: left;
  line-height: 30px;
  font-size: 12px;
  color: #226aff;
}
.titleTop-r {
  float: right;
  line-height: 30px;
  font-size: 12px;
  color: #226aff;
}
</style>
