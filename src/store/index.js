import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    localSrg: JSON.parse(localStorage.getItem('historysearch')) || [],
    message: []
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
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {

  }
})
