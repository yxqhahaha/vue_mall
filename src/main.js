import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
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

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')