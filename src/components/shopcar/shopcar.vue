<template>
  <div class="box">
    <div class="shopCarContent">
      <!-- 商品 -->
      <van-checkbox-group
        v-model="result"
        ref="checkboxGroup"
        @change="changeGroup">
        <!-- <van-button type="primary" @click="checkAll">全选</van-button> -->
        <!-- <van-button type="info" @click="toggleAll">反选</van-button> -->
        <div v-for="item in shopCarList" :key="item.id">
          <van-checkbox v-model="item.checked" :name="item.id">复选框 a</van-checkbox>
          <!-- <input type="checkbox"> -->
          <van-card
            :num="item.cou"
            :price="item.sell_price"
            :title="item.title"
            :thumb="item.thumb_path"
          >
            <div slot="footer">
              <van-stepper v-model="item.cou" />
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
import { log } from 'util';
export default {
  name: "shopcar",
  data() {
    return {
      result: [],
      shopCarList: [
        // cou 数量
        // sell_price 价格
        // title 标题
      ],
      checkedAll: []
    };
  },
  methods: {
    // 获取购物车信息
    async getShopCarList() {
      let res = await this.$http.get("/api/goods/getshopcarlist/87,88,89");
      this.shopCarList = res.data.message;
      this.shopCarList.forEach(item => {
        item.checked = false;
      });
      console.log(res.data.message);
      console.log(this.total);
    },
    onSubmit() {},
    changeGroup () {
      console.log(this.result);
      
    }
  },
  created() {
    this.getShopCarList();
  },
  computed: {
    getTotal() {
      let total = 0;
      this.shopCarList.forEach(item => {
        total += item.cou * item.sell_price;
      });
      return total * 100;
    }
  }
};
</script>

<style lang="css" scoped>
.back {
  position: fixed;
  top: 0;
  height: 40px;
  width: 100px;
  background-color: #1989fa;
  color: #fff;
  font-size: 20px;
  line-height: 40px;
  padding-left: 20px;
}
.shopCarContent {
  margin-top: 50px;
  height: 128px;
  line-height: 128px;
}
.van-card {
  font-size: 12px;
}
</style>
