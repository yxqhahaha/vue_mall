<template>
    <div>
      <form action="/">
      <van-search
        v-model="value"
        :placeholder="placeholder"
        show-action
        @search="onSearch(value)"
        @cancel="onCancel"
      />
      <div>
        <div v-show="!showEle" class="searchHis">
          <span class="searchHisSpan">搜索历史</span>
          <van-icon class="delIcon" name="delete" @click='delHistory'/>
        </div>
        <van-tag class="vanTag" v-show="!showEle" type="primary" v-for="(item,index) in tag" v-bind:key="index" @click="searchHistory(item)">{{item}}</van-tag>
      </div>
      <van-divider class="vanDivider" v-show="!showEle" :style="{ color: 'black', borderColor: 'gray', padding: '0 16px' }">
        暂无搜索历史
      </van-divider>
      <van-swipe-cell v-show="showEle" v-for="(item,key) in message" v-bind:key="key">
        <van-cell :border="false" :title="item.name" :value="item.ctime" />
        <template slot="right">
          <van-button @click.prevent="onDel(item.id)" type="danger" text="删除" />
        </template>
      </van-swipe-cell>
        <!-- <van-dialog
          v-model="show"
          title="标题"
          show-cancel-button
        >
          <img src="https://img.yzcdn.cn/vant/apple-3.jpg">
        </van-dialog> -->
      </form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'search',
  data: function () {
    return {
      value: '',
      placeholder: '请输入搜索关键词',
      showEle: false,
      show: false,
      // hide: true,
      historysearch: 'historysearch'
    }
  },
  computed: {
    message: {
      get () {
        return this.$store.state.message
      },
      set (val) {
        return []
      }
    },
    tag: {
      get () {
        return this.$store.state.localSrg
      },
      set (val) {
        return []
      }
    }
  },
  methods: {
    ...mapMutations(['getItem', 'removeItem', 'getMsg', 'hideEle']),
    getInfo () {
      this.$http.get('/api/getprodlist').then(this.getInfoSucc)
    },
    getInfoSucc (res) {
      this.getMsg(res)
    },
    onSearch (value) {
      if (value.trim() === '') {
        this.value = ''
        return (this.placeholder = '搜索内容不能为空')
      }
      this.showEle = true
      this.updated(value)
      this.placeholder = '请输入搜索关键词'
    },
    searchHistory (item) {
      this.value = item
    },
    async updated (value) {
      this.getInfo()
      await this.getItem(value)
    },
    onCancel () {
      this.showEle = false
    },
    delHistory () {
      this.$store.commit('removeItem')
      // this.hideEle()
    },
    onDel (id) {
      this.$dialog.confirm({
        title: '标题',
        message: '是否删除该商品'
      }).then(() => {
        this.$notify({ type: 'success', duration: 800, message: '删除成功' })
        this.$http.get('/api/delproduct/' + id).then(this.getInfo())
      }).catch(() => {
        this.$notify({ type: 'danger', message: '取消删除' })
      })
    },
    hideEle () {
      // if (this.tag && this.hide.length >= 1) {
      //   this.hide = true
      // } else {
      //   this.hide = false
      // }
    }
  },
  mounted () {
    // this.hideEle()
  }
}
</script>

<style lang="less" scoped>
  .searchHis{
    height: 30px;
    .searchHisSpan {
      float: left;
      margin-left: 20px;
    }
  }
  .delIcon {
    float: right;
    margin-right: 20px;
  }
  .vanTag {
    float: left;
    height: 25px;
    margin-left: 20px;
  }
  .vanDivider {
    margin-top: 60px;
  }
</style>
