import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
import './plugins/vant.js'
import { Swipe, SwipeItem } from 'vant';
import './css/globel.css'
import { Grid, GridItem } from 'vant';
import { Image } from 'vant';
import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar).use(TabbarItem);

Vue.use(Image);

Vue.use(Grid).use(GridItem);

Vue.use(Swipe).use(SwipeItem);

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'


Vue.prototype.$http = axios

Vue.filter('dateFormat', function(originVal) {
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