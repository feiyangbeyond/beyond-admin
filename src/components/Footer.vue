<template>
  <div class="footer">
    <div class="copyright">
      Proudly power by
      <router-link :to="{ name:'Profile' }">
        <a href="javascript:void(0);">Beyond</a>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    data() {
      return {}
    }
  }
</script>

<style lang="less" scoped>
  .footer {
    padding: 0 16px;
    margin: 20px 0 0;
    text-align: center;
    .copyright {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }
  a{
    text-underline: none;
  }
</style>
