import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/home/home.vue'
import newList from '../components/home/news/newList.vue'
import goodsList from '../components/home/goods/goodsList.vue'
import addgoods from '../components/home/goods/addgoods.vue'
import photoList from '../components/home/photo/photoList.vue'
import member from '../components/member/member.vue'
import shopcar from '../components/shopcar/shopcar.vue'
import search from '../components/search/search.vue'
import goodsDetail from '../components/home/goods/goodsDetail'
import goodsDesc from '../components/home/goods/goodsDesc'
import Detail from '../components/home/news/Detail.vue'
import photoInfo from '../components/home/photo/photoInfo.vue'
import comments from '../components/home/comments/comments'
import contactUs from '../components/home/contact/contactUs'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
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
    component: goodsList
  },
  {
    path: '/goods/detail/:id',
    name: 'goodsDetail',
    component: goodsDetail
  },
  {
    path: '/goodsdesc/:id',
    name: 'goodsDesc',
    component: goodsDesc
  },
  {
    path: '/goodscomments/',
    name: 'comments',
    component: comments
  },
  {
    path: '/addgoods',
    name: 'addgoods',
    component: addgoods
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
  },
  {
    path: '/news/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/photo/Info/:id',
    name: 'photo',
    component: photoInfo
  },
  {
    path: '/contactUs',
    name: 'contactUs',
    component: contactUs
  }
]

const router = new VueRouter({
  routes
})

export default router
