<template>
  <div class="box">
    <div v-if="text" class="messageNone">{{text}}</div>
    <div class="shopCarContent" v-else>
      <!-- 商品 -->
      <van-checkbox v-model="checkedAll" checked-color="#07c160" @click="checkAll" class="checkAll">全选</van-checkbox>
      <van-checkbox-group
        v-model="result"
        ref="checkboxGroup"
        @change="changeGroup">
        <div v-for="(item,i) in shopCarList" :key="item.id">
          <van-checkbox :name="i">选择</van-checkbox>
          <van-card
            :num="item.cou"
            :price="item.sell_price"
            :title="item.title"
            :thumb="item.thumb_path"
          >
            <div slot="footer">
              <van-stepper v-model="item.cou"/>
            </div>
          </van-card>
        </div>
      </van-checkbox-group>

      <!-- 合计 -->
      <van-submit-bar
        :price="getTotal"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
// import { log } from 'util'

export default {
  name: 'shopcar',
  data () {
    return {
      result: [],
      shopCarList: [
        // cou 数量
        // sell_price 价格
        // title 标题
      ],
      checkedAll: false,
      getList: [],
      text: ''
    }
  },
  methods: {
    // 获取购物车信息
    async getShopCarList () {
      this.getList = this.$store.state.shopCarList
      if (!this.getList.length) {
        this.text = '暂无数据'
        return false
      }
      console.log(this.getList)
      let getStr = this.getList.join(',')
      console.log(getStr)
      let res = await this.$http.get('/api/goods/getshopcarlist/' + getStr)
      this.shopCarList = res.data.message
      this.shopCarList.forEach((item, index) => {
        this.result.push(index)
      })
      console.log(res.data.message)
      console.log(this.total)
    },
    onSubmit () {
    },
    changeGroup () {
      if (this.result.length !== this.shopCarList.length) {
        this.checkedAll = false
      } else {
        this.checkedAll = true
      }
    },
    // 全选
    checkAll () {
      this.checkedAll = !this.checkedAll
      if (this.checkedAll) {
        this.$refs.checkboxGroup.toggleAll(true)
      } else {
        this.$refs.checkboxGroup.toggleAll(false)
      }
    }
  },
  created () {
    this.getShopCarList()
    if (this.result.length === this.shopCarList.length) {
      this.checkedAll = true
    }
  },
  computed: {
    getTotal () {
      let total = 0
      console.log(this.result)

      this.result.forEach(item => {
        if (typeof (item) === 'number') {
          // console.log(item);
          // console.log(this.shopCarList[item]);
          total += this.shopCarList[item].cou * this.shopCarList[item].sell_price
        }
      })
      return total * 100
    }
  }
}
</script>

<style lang="css" scoped>
  .messageNone {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .shopCarContent {
    position: absolute;
    top: 50px!important;
    height: 128px;
    line-height: 128px;
  }

  .van-card {
    font-size: 12px;
  }

  .checkAll {
    margin: 15px 0;
  }
</style>
