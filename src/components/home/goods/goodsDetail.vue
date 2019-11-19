<template>
  <div>

    <div class="goodsImg">
      <!--  商品图片展示  -->
      <van-swipe :autoplay="3000" touchable>
        <van-swipe-item v-for="(image, index) in goodsSwipe" :key="index">
          <img v-lazy="image"/>
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
        <span>购买数量</span>
        <van-stepper v-model="value" min="1" input-width="30px" :max="max" @change="onChange(value)"/>
      </div>
      <div class="btns">
        <van-button class="van-button van-button--info van-button--normal" size="small">立即购买</van-button>
        <van-button class="van-button van-button--danger van-button--normal" size="small" @click="addShopCar">加入购物车</van-button>
      </div>
    </div>
    <!--  商品参数  -->
    <div class="goods_params">
      <p class="params_title"> 商品参数 </p>
      <div class="params_detail">
        <p>商品货号:{{goodsInfo.goods_no}}</p>
        <p>库存情况:{{goodsInfo.stock_quantity}}</p>
        <p>上架时间:{{goodsInfo.add_time}}</p>
      </div>
      <div class="params_btns">
        <van-button plain type="primary" @click="toGoodsDesc">图文介绍</van-button>
        <van-button plain type="danger" @click="toGoodsComment">商品评论</van-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      // 商品信息
      goodsInfo: {},
      // 商品介绍页面的轮播图
      goodsSwipe: [],
      // 购买数量的最大值最小值
      value: 1,
      max: 1
    }
  },
  created () {
    this.getGoodsDetail()
  },
  methods: {
    // 获取商品详情页面数据
    async getGoodsDetail () {
      let id = this.getId
      // console.log(id)
      // 发送请求 获取商品详情页数据 /api/getimageInfo/:imgid
      const { data: res } = await this.$http.get(`/api/goods/getinfo/${id}`)
      this.goodsInfo = res.message[0]
      this.max = this.goodsInfo.stock_quantity
      // console.log(this.goodsInfo)

      // 发送请求获取商品详情页 轮播图
      const { data: res2 } = await this.$http.get(`/api/getthumimages/${id}`)
      if (res2.status !== 0) {
        this.$toast({
          message: '加载图片中'
        })
      }
      this.goodsSwipe = res2.message
      // console.log(res2)
    },
    /* change事件 */
    onChange (value) {
      // console.log(this.max)
      if (value >= this.goodsInfo.stock_quantity) {
        this.value = this.goodsInfo.stock_quantity
        this.$toast({
          message: '库存不足',
          position: 'top'
        })
      }
    },
    // 加入购物车
    async addShopCar () {
      // 获取store->state中购物车数组的值
      // 将当前商品的id 传入数组中
      this.$store.state.shopCarList.push(this.getId)
      this.$toast({
        message: '已加入购物车'
      })
    },
    // 跳转到商品图文介绍页面
    toGoodsDesc () {
      let id = this.getId
      this.$router.push(`/goodsdesc/${id}`)
    },
    // 跳转到商品评论
    toGoodsComment () {
      let id = this.getId
      // this.$router.push(`/news/detail/${id}`)
      this.$router.push({ path: '/goodscomments/', query: { id } })
    }
  },
  computed: {
    // 获取id
    getId () {
      // 根据当前url来获取id
      let id = this.$route.path.split('/')
      id = id[id.length - 1]
      return id
      // return this.$route.path.split('/')[id.length - 1];
    }
  }
}
</script>

<style lang="less" scoped>
  .goodsImg {
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 2px;
    margin: 10px 5px;
    overflow: hidden;
    height: 230px;

    .van-swipe-item {
      text-align: center;
      img {
        height: 200px;
        width: 200px;
      }
    }
  }

  .goodsInfo {
    border: 1px solid #ccc;
    border-radius: 2px;
    margin: 10px 5px;
    padding: 5px 10px;
    overflow: hidden;
    .goodsTitle {
      margin: 10px 0;
      font-size: 16px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    .price {
      text-align: left;
      font-size: 14px;
      color: #8f8f94;
      margin-top: 20px;
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
      margin: 10px 0;
      height: 50px;
      color: #8f8f94;
      span {
        margin:5px 10px 0  0;
        float: left;
        line-height: 40px;
      }
      .van-stepper {
        font-size: 12px;
        line-height: 40px;
      }
    }

    .btns {
      button {
        float: left;
        margin: 10px 8px;
      }
    }
  }
  .goods_params {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 5px;
    padding: 10px;
    .params_title {
      font-size: 16px;
      padding-bottom: 10px ;
      border-bottom: 1px solid #ccc;
    }
    .params_detail {
      font-size: 14px;
      color: #8f8f94;
      border-bottom: 1px solid #ccc;
      p {
        padding-left: 10px;
      }
    }
    .params_btns {
      button {
        width: 100%;
        display: block;
        margin: 10px 0;
      }
    }
  }
</style>
