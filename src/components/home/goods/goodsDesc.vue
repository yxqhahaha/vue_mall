<template>
  <div>
    test
  </div>
</template>

<script>
  export default {
    name: 'goodsDesc',
    data () {
      return {

      }
    },
    methods: {
      async getGoodsDescData () {
        console.log(123)
      }
    },
    computed : {

    },
    created () {
      this.getGoodsDescData()
    }
  }
</script>

<style scoped>

</style>
