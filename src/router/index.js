import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/home/home.vue'
import newList from '../components/home/news/newList.vue'
import goodsList from '../components/home/goods/goodsList.vue'
import photoList from '../components/home/photo/photoList.vue'
import member from '../components/member/member.vue'
import shopcar from '../components/shopcar/shopcar.vue'
import search from '../components/search/search.vue'
import goodsDetail from '../components/home/goods/goodsDetail'
import goodsDesc from '../components/home/goods/goodsDesc'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/newlist',
    name: 'newList',
    component: newList
  },
  {
    path: '/goods/list',
    name: 'goodsList',
    component: goodsList,
  },
  {
    path: '/goods/detail/:id',
    name: 'goodsDetail',
    component: goodsDetail,
  },
  {
    path: '/goodsdesc/:id',
    name: 'goodsDesc',
    component: goodsDesc,
  },
  {
    path: '/photo/list',
    name: 'photoList',
    component: photoList
  },
  {
    path: '/member',
    name: 'member',
    component: member
  },
  {
    path: '/shopcar',
    name: 'shopcar',
    component: shopcar
  },
  {
    path: '/search',
    name: 'search',
    component: search
  }
]

const router = new VueRouter({
  routes
})

export default router
