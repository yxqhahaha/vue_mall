<template>
    <div>
      <van-icon class="vanIcon" name="setting-o" size="40px" color="#1989fa" />
      <h3>开发中，敬请期待！！</h3>
    </div>
</template>

<script>
export default {
  name: 'member'
}
</script>

<style lang="less" scoped>
@keyframes changDeg{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.vanIcon {
    animation: changDeg 2s linear 0.2s infinite;
    margin: 20% 45% 10% 45%;
}
h3 {
  margin-left: 30%;
}
</style>
