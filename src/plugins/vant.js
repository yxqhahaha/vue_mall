import Vue from "vue";
import "vant/lib/index.css";
import { 
    Button, 
    Tab, 
    Tabs,
    Row, 
    Col, 
    Grid, 
    GridItem,
    Image,
    Lazyload,
    ImagePreview ,
    Cell, 
    CellGroup ,
    Field ,
    List 
 } from "vant";
Vue.use(List);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Lazyload);
Vue.use(Image);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Button);
Vue.use(Tab);
Vue.use(Tabs);
Vue.prototype.$ImagePreview=ImagePreview
