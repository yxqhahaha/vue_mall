import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* 存储购物车里面的商品列表 */
    shopCarList: [],
    list: [],
    feedList: [],
    localSrg: JSON.parse(localStorage.getItem('historysearch')) || [],
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
      state.localSrg = localStorage.removeItem('historysearch')
    },
    getItem (state, value) {
      state.localSrg.push(value)
      state.localSrg.reverse()
      localStorage.setItem('historysearch', JSON.stringify(state.localSrg))
      state.localSrg = JSON.parse(localStorage.getItem('historysearch'))
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
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {

  }
})
