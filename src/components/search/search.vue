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
  <div v-show="!show">
    <span>搜索历史</span>
    <van-icon name="delete" @click='delHistory'/>
  </div>
  <van-tag v-show="!show" type="primary" v-for="(item,index) in tag" v-bind:key="index">{{item}}</van-tag>
  </div>
  <van-divider v-show="!show" :style="{ color: 'black', borderColor: 'gray', padding: '0 16px' }">
  暂无搜索历史
</van-divider>
<van-swipe-cell v-show="show" v-for="(item,key) in message" v-bind:key="key">
  <van-cell :border="false" :title="item.name" :value="item.ctime" />
  <template slot="right">
    <van-button @click.prevent="onDel(item.id)" type="danger" text="删除" />
  </template>
</van-swipe-cell>
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
      show: false,
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
    ...mapMutations(['getItem', 'removeItem', 'getMsg']),
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
      this.show = true
      this.updated(value)
      this.placeholder = '请输入搜索关键词'
    },
    updated (value) {
      this.getInfo()
      this.getItem(value)
    },
    onCancel () {
      this.show = false
    },
    delHistory () {
      this.$store.commit('removeItem')
    },
    onDel (id) {
      this.$http.get('/api/delproduct/' + id).then(this.getInfo())
    }
  }
}
</script>

<style lang="less" scoped>
</style>
