<template>
   <div class="title">

      <i @click="back" v-text="textBack"></i>
      <span>
        移动商城
      </span>
    </div>

</template>

<script>
export default {
    data(){
        return{
      nowURL:''

        }
    },
    methods: {
      back(){
        this.$router.go(-1)
      }
        
    },
    created() {
          this.nowURL=window.location.hash
          console.log(this.nowURL);
          

          
    },

    computed: {
        
    },
    component: {

    },
  created () {
    this.nowURL = window.location.hash
    console.log(this.nowURL)
  },
  updated () {
    this.nowURL = window.location.hash
    console.log(this.nowURL)
  },
  computed: {
  },
  component: {
  }
  }

</script>

<style lang="css" scoped>
.title{
  position: fixed;
  top: 0;
  width: 100%;
  background-color:#1989FA;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #fff;
  z-index: 999;
}
.title i {

  position: absolute;
  left: 20px;
  font-style: normal;
}
</style>
