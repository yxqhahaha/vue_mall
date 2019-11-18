<template>
  <div>
    <headers></headers>
    <div class="ph_main">
      <van-row>
        <h4 class="title">{{ picInfo.title }}</h4>
        <p class="titleP">
          <span data-v-73ff6e9a="" class="time">发表时间: {{ datesFormat(picInfo.add_time) }}</span>
          <span data-v-73ff6e9a="" class="click">点击: {{ picInfo.click }}</span>
        </p>
        <hr />
        <div class="content">
          <van-grid :border="false" :column-num="3">
            <van-grid-item v-for="(item, index) in picList" :key="index">
              <van-image :src="item.src" @click="clickImg()" />
            </van-grid-item>
          </van-grid>
          <p v-html="picInfo.content"></p>
        </div>
        <div class="comments">
          <div data-v-67532562="" data-v-73ff6e9a="" style="padding: 0px 5px;">
            <h4 data-v-67532562="">发表评论</h4>
            <hr data-v-67532562="" />
            <van-cell-group border>
              <van-field
                v-model="message"
                rows="2"
                autosize
                type="textarea"
                maxlength="50"
                placeholder="请输入留言"
                show-word-limit
              />
            </van-cell-group>
            <div style='margin-top:10px'></div>
            <van-button type="info" size="small">提交评论</van-button>
            <div style="margin-top:10px">
              <div v-for="(item, index) in commentList" :key="index" style="margin-top:10px">
                <div class="comTitle">
                  <span>第{{ index + 1 }}楼</span>
                  <span>用户:{{ item.user_name }}</span>
                  <span>发表时间: {{ datesFormat(item.add_time) }}</span>
                </div>
                <div class="comcontent">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </van-row>
    </div>
  </div>
</template>
<script>
import header from "../../header/header";
export default {
  data() {
    return {
      picList: [],
      picInfo: {},
      message: "",
      commentList: [1, 2, 3]
    };
  },
  components: {
    headers: header
  },
  mounted() {
    this.getPhotoList();
  },
  methods: {
    datesFormat(time) {
   
    
      return (time||'').split("T")[0];
    },
    async getPhotoList() {
      let id = this.$route.params.id;
      const { data } = await this.$http.get("/api/getthumimages/" + id);
      console.log(data.message);
      this.picList = data.message;
      const { data: res } = await this.$http.get("/api/getimageInfo/" + id);
      console.log(res.message[0]);
      this.picInfo = res.message[0];
      const { data: res1 } = await this.$http.get(`/api/getcomments/${id}?pageindex=1`);
      console.log(res1.message);
      this.commentList = res1.message;
    },
    clickImg() {
      let imgList = [];
      this.picList.forEach(e => {
        imgList.push(e.src);
      });
      console.log(imgList);
      this.$ImagePreview({
        images: imgList
        // asyncClose: true
      });
    }
  }
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.ph_main {
  margin-top: 20px;
  padding: 10px 10px;
  .title {
    text-align: center;
    color: #26a2ff;
  }
  .van-grid-item__content--center {
    padding: 10px !important;
  }
  .content .van-image {
    width: 100%;
    box-shadow: 1px 0 8px 1px rgba(0, 0, 0, 0.3);
  }
  h4 {
    font-size: 15px;
  }
  .titleP {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 13px;
      color: #8f8f94;
    }
  }
  .comInput {
    width: 100%;
    display: flex;
    textarea {
      padding: 10px 10px;
      width: 100%;
      min-height: 200px;
      background-color: #fff;
      font-size: 14px;
      resize: none;
    }
  }
}
</style>
<style lang="less">
.ph_main .van-grid-item__content--center {
  padding: 5px !important;
}
.ph_main .van-field {
  border: 1px solid #eee;
}
.comTitle {
  background-color: #ccc;
}
.comTitle {
  padding: 5px;
  span {
    padding-right: 10px;
  }
}
.comcontent {
  margin-top: 10px;
}
.comTitle,
.comcontent {
  font-size: 12px;
}
</style>
