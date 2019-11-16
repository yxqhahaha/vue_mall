<template>
    <div>
        Home
        <goodsList />
        <!-- <newList /> -->
        <photoList />
    </div>
</template>

<script>
import goodsList from './goods/goodsList'
// import newList from './news/newList'
import photoList from './photo/photoList'

export default {
  name: 'home',
  components: {
    goodsList,
    // newList,
    photoList
  }
}
</script>

<style lang="less" scoped>

</style>
