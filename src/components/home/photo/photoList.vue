<template>
  <div>
    <headers></headers>
    <div class="main">
      <!-- van-tab组件的change事件在当前激活的标签改变时触发，这个事件可以接收两个回调参数（name：标签标识符，title：标题） -->
      <van-row>
        <van-tabs
          v-model="active"
          @change="
            name => {
              selectChange(name)
            }
          "
        >
          <!-- 这里的name属性就是上面的change事件的标签标识符，将id传进去，回调参数里面就可以接收到这个id -->
          <van-tab :title="item.title" v-for="item in photoTabeList" :key="item.id" :name="item.id">
            <lazy-component>
              <div v-for="item in photoList" v-lazy="item.img_url" :key="item.id" class="imgBox" @click="clickImg(item.id)">
                <img :src="item.img_url" alt="" />
                <div class="text">
                  <p>{{ item.seo_title }}</p>
                  <p v-html="item.content"></p>
                </div>
              </div>
            </lazy-component>
          </van-tab>
        </van-tabs>
      </van-row>
    </div>
    <footers></footers>
  </div>
</template>

<script>
import header from '../header'
import footer from '../footer'
export default {
  name: 'photoList',
  components: {
    headers: header,
    footers: footer
  },
  data () {
    return {
      photoTabeList: [],
      photoList: [],
      id: 0,
      active: 0
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    async getInfo () {
      const { data: res } = await this.$http.get(`/api/getimgcategory`)
      console.log(res)
      this.photoTabeList = res.message
      console.log(this.photoTabeList)
      this.photoTabeList.unshift({ id: 0, title: '全部' })
      const { data: res1 } = await this.$http.get(`/api/getimages/${this.id}`)
      console.log(res1)
      this.photoList = res1.message
    },
    selectChange (name) {
      console.log(name)
      this.id = name
      console.log(name)
      this.getInfo()
    },
    clickImg (id) {
      console.log(id)
      this.$router.push('/photo/Info/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  img {
    height: 300px;
  }
  padding: 40px 10px 10px;
  .imgBox {
    margin-top: 10px;
    position: relative;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      bottom: 0;
      font-size: 12px;
      left: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      height: 75px;
    }
  }
}
</style>
