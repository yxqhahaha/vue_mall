import Vue from 'vue'
import 'vant/lib/index.css'
import { Button, Search, Divider, Icon, Tag, Tab, Tabs, Row, Col, Grid, GridItem, Image, Lazyload, ImagePreview, Cell, CellGroup, Field, List, SwipeCell, Notify, Dialog, Loading, PullRefresh } from 'vant'
Vue.use(PullRefresh)
Vue.use(Loading)
Vue.use(Search)
Vue.use(Divider)
Vue.use(Icon)
Vue.use(List)
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Lazyload)
Vue.use(Image)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(SwipeCell)
Vue.use(Notify)
Vue.use(Dialog)
Vue.use(ImagePreview)

Vue.prototype.$ImagePreview = ImagePreview
