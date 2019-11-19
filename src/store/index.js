import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* 存储购物车里面的商品列表 */
    shopCarList: [],
    list: [],
    feedList: [],
    localSrg: [],
    message: [],
    goodsId: 1,
    newsId: 1,
    videoId: 1
  },
  mutations: {
    add (state, val) {
      let oldArray = state.feedList
      let newArray = oldArray.concat(val)
      state.feedList = newArray
    },
    updateMsg (state, val) {
      state.feedList = val
    },
    removeItem (state) {
      localStorage.removeItem('historysearch')
      state.localSrg = []
    },
    getItem (state, value) {
      let arr = state.localSrg
      arr.push(value)
      arr.reverse()
      localStorage.removeItem('historysearch')
      localStorage.setItem('historysearch', state.localSrg)
      state.localSrg = arr
    },
    getMsg (state, res) {
      state.message = res.data.message
    },
    getGoodsId (state, id) {
      state.goodsId = id
    },
    getNewsId (state, id) {
      state.newsId = id
    },
    getVideoId (state, id) {
      state.videoId = id
    },
    getShopCarList (state, goodsId) {
      state.shopCarList.push(goodsId)
    },
    createLocal (state) {
      state.localSrg = []
    },
    updateLocal (state, val) {
      if (val.split(',') === undefined) {
        state.localSrg = []
        return
      }
      state.localSrg = val.split(',')
      localStorage.setItem('historysearch', state.localSrg)
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {

  }
})
