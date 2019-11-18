<template>
  <div>
    <div class="content">
      <div v-for="(item, i) in list" :key="i">
        <h3 class="tit">买房还是炒股，2015年买房无法拒绝的5大理由</h3>
        <div class="info">
          <span>发表时间：{{item.add_time | dateFormat}}</span>
          <span>点击次数：{{item.click}}</span>
        </div>
        <div v-html="item.content">
        </div>
      </div>
      <!-- 评论区域 -->
      <div class="base">
        <h4>发表评论</h4>
        <div>
          <van-field class="text" v-model="content" placeholder="请输入留言">
          </van-field>
          <van-button class="btn" type="info" @click="addClick">发表评论</van-button>
          <div v-for="(item, index) in feedList" :key="index">
            <div class="title">
              <span class="title-l">第{{index+1}}楼</span>
              <span class="title-l">用户：{{item.user_name}}</span>
              <span class="title-l">发表时间：{{item.add_time | dateFormat }}</span>
            </div>
            <div class="bodys">
              <span>{{item.content}}</span>
            </div>
          </div>
        </div>
      </div>
      <van-button class="btnCliss" @click="btnCliss">加载更多</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      list: [],
      newId: '',
      content: '',
      counet: 1
    }
  },
  computed: {
    feedList: {
      get () {
        return this.$store.state.feedList
      },
      set (val) {
        return []
      }
    }
  },
  created () {
    this.detailList()
    this.newFeed()
  },
  methods: {
    // 获取数据
    async detailList () {
      this.newId = this.$route.query.id
      const { data: res } = await this.$http.get('/api/getnew/' + this.newId)
      this.list = res.message
    },
    // 拿到评论数据
    async newFeed () {
      const { data: res } = await this.$http.get(`/api/getcomments/${this.newId}?pageindex=${this.counet}`)
      this.$store.commit('add', res.message)
    },
    async add () {
      const { data: res } = await this.$http.get(`/api/getcomments/${this.newId}?pageindex=1`)
      this.$store.commit('updateMsg', res.message)
    },
    // 点击提交评论信息
    async addClick () {
      await this.$http.post(`/api/postcomment/${this.newId}`, { artid: this.newId, content: this.content })
      this.add()
      this.newFeed()
      this.content = ''
    },
    // 加载更多评论
    async btnCliss () {
      this.counet++
      const { data: res } = await this.$http.get(`/api/getcomments/${this.newId}?pageindex=${this.counet}`)
      this.$store.commit('add', res.message)
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.content {
  margin-top: 40px;
  padding: 0 10px;
}
.tit {
  color: #1989fa;
  font-size: 14px;
  line-height: 30px;

  text-align: center;
}
.info {
  display: flex;
  font-size: 13px;
  padding: 7px 0;
  border-bottom: 1px solid #ccc;
  color: #1989fa;
  justify-content: space-between;
}
.btn {
  margin: 10px 0;
}
.base {
  h4 {
    margin: 20px 0;
  }
}
.text {
  height: 100px;
  border: 1px solid #cccccc;
}
.text-i {
  padding: 10px 15px;
}
.van-button {
  width: 100%;
}
.title {
  height: 30px;
  background-color: #ccc;
  font-size: 12px;
  line-height: 30px;
}
.bodys {
  height: 30px;
  line-height: 35px;
  text-indent: 2em;
  font-size: 12px;
  margin-top: 10px;
  text-align: left;
}

.title-l {
  float: left;
  margin-right: 6px;
}
.btnCliss {
  color: pink;
  border: 1px solid pink;
}
</style>
