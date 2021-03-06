import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
import './plugins/vant.js'
import './css/globel.css'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'

Vue.use(VueVideoPlayer)
Vue.prototype.$http = axios

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  return `${y}-${m}-${d}`
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
