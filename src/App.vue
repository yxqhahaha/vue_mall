<template>
  <div id="app">
    <!-- <Home /> -->
    <headers></headers>
    <router-view />
<footers></footers>
  </div>
</template>

<script>
// import Home from '@/views/Home.vue'
// import home from '@/components/home/home.vue'
import headers from './components/home/header'
import footers from './components/home/footer'
export default {
  name: 'app',
  components: {
    headers:headers,
    footers:footers
  }
  // components: {
  //   // Home,
  //   home
  // }
}
</script>

<style>

</style>
