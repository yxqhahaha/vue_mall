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
              <div v-for="item in photoList" v-lazy="item" :key="item.id" class="imgBox" @click="clickImg(item.id)">
                <div class="video-box">
                  <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                                :options="playerOptions(item)"></video-player>
                </div>
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
    playerOptions (item) {
      // console.log(item.img_url)
      return {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: '',
            src: 'http://ugccsy.qq.com/uwMROfz2r5zBIaQXGdGnC2dfhzknrthYD-Z_acttsiZdV6SQ/e0394170eri.m701.mp4?vkey=B8070FFBF23E6E6238C177EF894EC956A78AFE7D71D8D5CC6BFAA34A6FBA7EBC27ED4D23F157DE1EE599E9DD80984B06CADA20773263A00ECEFD35CD27C3E811569250A061CC116E2BBBEB72D723533D76AF17FB79DFB410BBA7046339577657380F3B767A17757D8E15FD8AA5B7EAFA&br=29&platform=2&fmt=auto&level=0&sdtfrom=v1010&sdtfrom=v1010' // 视频url地址
          }
        ],
        poster: item.img_url, // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    },
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
    }
  }
}
</script>

<style lang="less" scoped>
  .main {
    padding: 40px 10px 10px;

    .imgBox {
      margin-top: 10px;

      .text {
        font-size: 12px;
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        height: 75px;
        overflow: hidden;
      }
    }
  }
</style>
