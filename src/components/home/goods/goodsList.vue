<template>
    <div>
      <van-list v-model="loading" :finished="finished"  error-text="请求失败，点击重新加载"  >
            <van-cell v-for="item in goodsList" :key="item.id"  gutter="3" @click="toGoodsDetail(item.id)">
              <div>
                <van-image width="300" height="300" :src="item.img_url" />
              </div>
              <p>
                {{item.title}}
              </p>
              <div class="bottom_box">
                  <div>
                    <span class="goods_price">￥{{item.sell_price}}</span>
                    <del>￥{{item.market_price}}</del>
                  </div>
                  <div class="stock">
                    <span >热卖中</span>
                    <span >剩余{{item.stock_quantity}}件</span>
                  </div>
              </div>

        </van-cell>
      </van-list>
    </div>
</template>

<script>
import { mapMutations} from 'vuex'
export default {
  name: 'goodsList',
  data () {
    return {
      // 获取所有商品列表
      goodsList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    ...mapMutations(['goodsDetail']),
    async getGoodsList(){
      // 获取第一页数据 /api/getgoods?pageindex=1
      const {data: res} = await this.$http.get('/api/getgoods?pageindex=1')
      if(res.status !== 0){
        console.log('获取数据失败')
        return
      }
      this.goodsList = res.message;
      console.log(res)
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.goodsList.push(this.goodsList.length + 1);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.goodsList.length >= 10) {
          this.finished = true;
        }
      }, 500);
    },
    toGoodsDetail (id) {
      this.$router.push(`detail/${id}`)
    }
  },
  created () {
    this.getGoodsList();
  }
}
</script>

<style lang="less" scoped>
  .van-list {
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 5px 10px;
    .van-cell {
      box-sizing: border-box;
      /*float: left;*/
      width: 48%;
      margin: 10px 0;
      border: 1px solid #ccc;
      p {
        font-size: 14px;
        text-align: left;
      }
      .bottom_box{
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
