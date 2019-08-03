<template>
  <div v-loading="loading" class="parent-div">
    <blockquote>博客数据</blockquote>
    <el-row :gutter="40">
      <el-col :span="5" :offset="2">
        <el-card class="box-card">
          <h1><i class="el-icon-edit-outline"></i></h1>
          <span>发表了{{articles}}篇文章</span>
        </el-card>
      </el-col><el-col :span="5">
        <el-card class="box-card">
          <h1><i class="el-icon-chat-line-round"></i></h1>
          <span>友链了{{links}}个好友</span>
        </el-card>
      </el-col><el-col :span="5">
        <el-card class="box-card">
          <h1><i class="el-icon-edit-outline"></i></h1>
          <span>博客被{{visited}}人访问</span>
        </el-card>
      </el-col><el-col :span="5">
        <el-card class="box-card">
          <h1><i class="el-icon-edit-outline"></i></h1>
          <span>博客已运行{{runDays}}天</span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import adminApi from "../../api/admin";

  export default {
    name: "Home",
    data(){
      return {
        currentDate: new Date(),
        loading: false,
        runDays: 0,//运行天数
        articles: 0,//文章总数
        links: 0,//评论
        visited: 0,//访问量
      }
    },
    beforeRouteEnter: (to, from, next) => {
      console.log('准备进入首页');
      next(vm => {
        //vm.getData();
        //vm.loading = true;
      })
    },
    beforeRouteLeave: (to, from, next) => {
      console.log('准备离开首页');
      next();
    },
    created(){
      this.getData();
      this.loading = true;
    },
    /*
    articleCount: 6
attachmentCount: 0
birthday: 1563267217000
commentCount: 3
establishDays: 18
linkCount: 2
visitedCount: 0*/
    methods: {
      getData(){
        adminApi.info()
          .then(res => {
            this.runDays = res.data.data.establishDays;
            this.articles = res.data.data.articleCount;
            this.visited = res.data.data.visitedCount;
            this.links = res.data.data.linkCount;
            this.loading = false;
          })
          .catch(error => {
            this.$message.error("服务异常")
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
    width: 230px;
    height: 170px;
  }

  blockquote {
    padding: 11px 15px;
    color: #666;
    border-left: 4px solid #f0f2f5;
    margin: 0;
    height: 23px;
    width: 1200px;
    background-color: #efeef5;
  }

  .parent-div{
    max-width: 1400px;
    margin: 0 auto;
  }
</style>
