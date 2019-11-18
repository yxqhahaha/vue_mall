import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    feedList: []
  },
  mutations: {
    add (state, val) {
      let oldArray = state.feedList
      let newArray = oldArray.concat(val)
      state.feedList = newArray
    },
    updateMsg (state, val) {
      state.feedList = val
    }
  },
  actions: {
  },
  modules: {
  }
})
