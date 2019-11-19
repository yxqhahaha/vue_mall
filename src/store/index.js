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
    goodsId: 1
  },
  mutations: {
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
