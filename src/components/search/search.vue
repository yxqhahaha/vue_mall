<template>
    <div class="mainDiv">
      <i class="createdGoods" @click.prevent="toAddGoods()">添加</i>
      <form action="/">
      <van-search
        v-model="value"
        :placeholder="placeholder"
        show-action
        @search="onSearch(value)"
        @cancel="onCancel"
      />
        <div v-show="!showEle">
          <div  class="searchHis">
          <span class="searchHisSpan">搜索历史</span>
          <van-icon class="delIcon" name="delete" @click='delHistory'/>
        </div>
        <van-tag class="vanTag" type="primary" v-for="(item,index) in tag" v-bind:key="index" @click="searchHistory(item)">{{item}}</van-tag>
        <van-divider class="vanDivider" v-show="hide" :style="{ color: 'black', borderColor: 'gray', padding: '0 16px' }">
        暂无搜索历史
        </van-divider>
      </div>
      <van-swipe-cell v-show="showEle" v-for="(item,key) in message" v-bind:key="key">
        <van-cell :border="false" :title="item.name" :value="item.ctime |dateFormat" />
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
      showEle: false,
      show: false,
      hide: true,
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
    ...mapMutations(['getItem', 'removeItem', 'getMsg', 'hideEle', 'updateLocal', 'createLocal']),
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
      this.hideEle()
    },
    searchHistory (item) {
      this.value = item
    },
    updated (value) {
      this.getItem(value)
      this.getInfo()
    },
    onCancel () {
      this.showEle = false
    },
    delHistory () {
      this.$store.commit('removeItem')
      this.hideEle()
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
    toAddGoods () {
      this.$router.push({
        path: '/addgoods'
      })
    },
    hideEle () {
      if (localStorage.getItem('historysearch') === null) {
        return (this.hide = true)
      }
      if (localStorage.getItem('historysearch').length >= 1) {
        return (this.hide = false)
      }
    },
    getLocalSrg () {
      if (localStorage.getItem('historysearch')) {
        let LocalStorage = localStorage.getItem('historysearch')
        this.updateLocal(LocalStorage)
        return
      }
      this.createLocal()
    }
  },
  mounted () {
    this.hideEle()
  },
  created () {
    this.getLocalSrg()
  }
}
</script>

<style lang="less" scoped>
  .mainDiv {
    padding-top: 15%;
  }
  .searchHis {
    height: 30px;
    .searchHisSpan {
      float: left;
      margin-left: 20px;
    }
  }
  .delIcon {
    float: right;
    margin-right: 5%;
  }
  .vanTag {
    float: left;
    height: 25px;
    margin-left: 20px;
    margin-bottom: 5px;
  }
  .vanDivider {
    margin-top: 80px;
  }
  .createdGoods {
    position: fixed;
    top: 10px;
    right: 20px;
    font-style: normal;
    font-size: 14px;
    color: #fff;
    z-index: 999;
  }
</style>
