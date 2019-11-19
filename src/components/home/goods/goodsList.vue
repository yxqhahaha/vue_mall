<template>
  <div class="main-box">
    <van-list v-model="loading" :finished="finished" error-text="请求失败，请返回重试" @load="onLoad">
      <van-cell v-for="item in goodsList" :key="item.id" gutter="3" @click="toGoodsDetail(item.id)">
        <div>
          <van-image :src="item.img_url"/>
        </div>
        <p class="title">
          {{item.title}}
        </p>
        <div class="bottom_box">
          <div>
            <span class="goods_price">￥{{item.sell_price}}</span>
            <del>￥{{item.market_price}}</del>
          </div>
          <div class="stock">
            <span>热卖中</span>
            <span>剩余{{item.stock_quantity}}件</span>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'goodsList',
  data () {
    return {
      // 获取所有商品列表
      goodsList: [],
      pageindex: 1,
      loading: false,
      finished: false
    }
  },
  methods: {
    ...mapMutations(['getGoodsId']),
    async getGoodsList (pageindex) {
      // 获取第一页数据 /api/getgoods?pageindex=1
      const { data: res } = await this.$http.get(`/api/getgoods?pageindex=${pageindex}`)
      if (res.status !== 0) {
        console.log('获取数据失败')
        return
      }
      res.message.forEach(el => {
        this.goodsList.push(el)
      })
      // console.log(res)
    },
    async onLoad () {
      // 异步更新数据
      await setTimeout(() => {
        for (let i = 0; i < this.goodsList.length - 2; i++) {
          console.log(1234)
          this.pageindex++
          this.getGoodsList(this.pageindex)
          // this.goodsList.push(this.goodsList.length + 1)
        }
        // 加载状态结束
        this.loading = true
        // 数据全部加载完成
        if (this.goodsList.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    toGoodsDetail (id) {
      this.$store.commit('getGoodsId', id)
      this.$router.push(`detail/${id}`)
    }
  },
  created () {
    this.getGoodsList(this.pageindex)
  }
}
</script>

<style lang="less" scoped>
  .main-box {
    margin-top: 45px;
  }
  .van-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 5px 10px;
    .van-cell {
      box-sizing: border-box;
      /*float: left;*/
      width: 48%;
      margin: 10px 0;
      border: 1px solid #ccc;
      padding: 0;
      .van-image {
        padding: 10px;
        min-height: 180px;
      }
      p {
        padding: 4px 10px;
        font-size: 14px;
        text-align: left;
      }
      .bottom_box {
        background-color: #eee;
        padding: 5px 0;

        span {
          padding: 0 10px;
        }
        .goods_price {
          color: red;
          margin-right: 20px;
        }
        .stock {
          text-align: center;
          display: flex;
          -webkit-box-pack: justify;
          justify-content: space-between;
          align-content: space-between;
        }
      }
    }
  }
</style>
