<template>
    <div>
      <div class="goodsImg">
        <!--  商品图片展示  -->
        <van-swipe :autoplay="3000">
                  <van-swipe-item v-for="(image, index) in goodsSwipe" :key="index">
                    <img v-lazy="image" />
                  </van-swipe-item>
        </van-swipe>
      </div>
      <!--  商品介绍信息  -->
      <div class="goodsInfo">
        <div class="goodsTitle">
          <span><strong>{{goodsInfo.title}}</strong></span>
        </div>
        <div class="price">
          <p>
            <span>市场价 <del>￥{{goodsInfo.market_price}}</del></span>
            <span>销售价</span><span class="goods_price">￥{{goodsInfo.sell_price}}</span>
          </p>
        </div>
        <div class="buyCount">
          <span>购买数量</span><van-stepper v-model="value" min="1" input-width="30px" :max="max"  @change="onChange(value)" />
        </div>
        <div class="btns">
          <van-button type="primary" size="small">立即购买</van-button>
          <van-button type="warning" size="small">加入购物车</van-button>
        </div>
      </div>
      <!--  商品参数  -->
      <div class="goods_params">
          <p><strong>商品参数</strong></p>
          <div>
            <p>商品货号:{{goodsInfo.goods_no}}</p>
            <p>库存情况:{{goodsInfo.stock_quantity}}</p>
            <p>上架时间:{{goodsInfo.add_time}}</p>
          </div>
          <div class="goods_params_btns">
            <van-button plain type="primary" @click="toGoodsDesc">图文介绍</van-button>
            <van-button plain type="danger" >商品评论</van-button>

          </div>
      </div>

    </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import goodsList from './goodsList'
  export default {
    name: 'detail',
    data(){
      return {
        goodsInfo: {},
        goodsSwipe: [],
        value : 1,
        max: 1
      }
    },
    created () {
      this.getGoodsDetail()
    },
    methods: {
      // 获取商品详情页面数据
      async getGoodsDetail () {
        let id = this.getId;
        console.log(id)
        // 发送请求 获取商品详情页数据 /api/getimageInfo/:imgid
        const {data : res} = await this.$http.get(`/api/goods/getinfo/${id}`);
        this.goodsInfo = res.message[0];
        this.max = this.goodsInfo.stock_quantity;
        console.log(this.goodsInfo);

        // 发送请求获取商品详情页 轮播图
        const {data : res2} = await  this.$http.get(`/api/getthumimages/${id}`);
        if(res2.status !== 0){
          this.$toast({
            message: '加载图片中'
          })
        }
        this.goodsSwipe = res2.message;
        console.log(res2);
      },
      onChange (value) {
        console.log(this.max)
        if (value >= this.goodsInfo.stock_quantity){
          this.value = this.goodsInfo.stock_quantity
          this.$toast({
            message:'库存不足',
            position:'top'
          });
        }
      },
      toGoodsDesc() {
        let id = this.getId;
        this.$router.push(`/goodsdesc/${id}`);
      }
    },
    computed: {
        getId () {
          // 根据当前url来获取id
          let id = this.$route.path.split('/');
          id = id[id.length - 1];
          return id
          // return this.$route.path.split('/')[id.length - 1];
        }
    }
  }
</script>

<style lang="less" scoped>
  .goodsImg {
    height: 200px;
    border: 1px solid #eee;
    border-radius: 2px;
    margin: 10px 5px;
    overflow: hidden;
    height: 230px;
    .van-swipe-item {
      img {
        height: 200px;
        width: 200px;
      }
    }
  }
  .goodsInfo {
    border: 1px solid #eee;
    border-radius: 2px;
    margin: 10px 5px;
    padding: 5px 10px;
    overflow: hidden;
    .goodsTitle {
      font-size: 14px;
      text-align: center;
      border-bottom: 1px solid #eee;
    }
    .price {
      text-align: left;
      font-size: 16px;
      del {
        margin-right: 10px;
      }
      .goods_price {
        font-size: 14px;
        color: red;
      }
    }
    .buyCount {
      text-align: left;
      font-size: 14px;
      margin: 5px 0;
      span {
        float: left;
      }
      .van-stepper {
        font-size: 12px;
      }
    }
    .btns {
      button {
        float: left;
        margin: 0 3px;
      }
    }
  }
</style>
