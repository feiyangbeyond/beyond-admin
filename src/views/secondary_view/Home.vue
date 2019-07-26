<template>
  <div>
    <blockquote>博客数据</blockquote>
    <div class="el-row" style="margin-left: -20px; margin-right: -20px;">
      <div class="el-col el-col-24 el-col-xs-12 el-col-sm-12 el-col-lg-6" style="padding: 20px;">
        <div class="el-card is-always-shadow" role="1">
          <div class="el-card__body"><span><h1><i class="el-icon-edit-outline"></i></h1></span> <span><span
            class="font">发表了</span> <span class="num">6</span> <span class="font">篇文章</span></span></div>
        </div>
      </div>
      <div class="el-col el-col-24 el-col-xs-12 el-col-sm-12 el-col-lg-6" style="padding: 20px;">
        <div class="el-card is-always-shadow" role="2">
          <div class="el-card__body"><span><h1><i class="el-icon-chat-line-round"></i></h1></span> <span><span class="font">收到了</span> <span
            class="num">3</span> <span class="font">条评论</span></span></div>
        </div>
      </div>
      <div class="el-col el-col-24 el-col-xs-12 el-col-sm-12 el-col-lg-6" style="padding: 20px;">
        <div class="el-card is-always-shadow" role="3">
          <div class="el-card__body"><span><h1><i class="el-icon-star-off"></i></h1></span> <span><span
            class="font">博客被</span> <span class="num">4</span> <span class="font">人访问</span></span></div>
        </div>
      </div>
      <div class="el-col el-col-24 el-col-xs-12 el-col-sm-12 el-col-lg-6" style="padding: 20px;">
        <div class="el-card is-always-shadow" role="4">
          <div class="el-card__body"><span><h1><i class="el-icon-date"></i></h1></span> <span><span
            class="font">博客已运行</span> <span class="num">2</span> <span class="font">天</span></span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Home",
    beforeRouteEnter: (to, from, next) => {
      console.log('准备进入首页');
      next(vm => {
        vm.getData();
      })
    },
    beforeRouteLeave: (to, from, next) => {
      console.log('准备离开首页');
      next();
    },
    methods: {
      getData: function () {
        console.log("开始跨域请求");
        this.axios({
          method: 'get',
          url: 'http://locakhost:8080/data.json'
        }).then(function (resp) {
          console.log(resp);
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    margin: 10px 20px;
    width: 350px;
    height: 270px;
    float: left;
  }

  blockquote {
    padding: 11px 15px;
    color: #666;
    border-left: 4px solid #ddd;
    margin: 0;
    height: 30px;
    background-color: #efeef5;
  }

</style>
