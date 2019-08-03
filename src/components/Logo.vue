<template>
  <div class="logo">
    <router-link :to="{ name:'Profile' }">
      <h1 class="logo-title">Beyond</h1>
<!--      <h1 class="logo-sub-title">Dashboard</h1>-->
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Logo'
  }
</script>

<style scope>
  .logo-sub-title{
    padding-left: 10px;
  }
</style>
