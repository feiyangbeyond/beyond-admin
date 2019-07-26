<template>
      <el-container style="border: 1px solid #eee; height: 100%; overflow: hidden;">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <img src="../assets/logo.jpg" style="width: 200px">
          <el-menu :default-openeds="['1']">
            <el-menu-item index="1">
              <template slot="title"><router-link to="/home"><i class="el-icon-s-home"></i>首页</router-link> </template>
            </el-menu-item>

            <el-menu-item index="2">
              <template slot="title"><router-link to="/new"><i class="el-icon-edit-outline"></i>发布文章</router-link></template>
            </el-menu-item>

            <el-menu-item index="3">
              <template slot="title"><router-link to="/articles"><i class="el-icon-notebook-1"></i>文章管理</router-link></template>
            </el-menu-item>

            <el-menu-item index="4">
              <template slot="title"><router-link to="/comments"><i class="el-icon-chat-dot-round"></i>评论管理</router-link></template>
            </el-menu-item>

            <el-menu-item index="5">
              <template slot="title"><router-link to="/category"><i class="el-icon-collection-tag"></i>分类/标签</router-link></template>
            </el-menu-item>

            <el-menu-item index="6">
              <template slot="title"><router-link to="/link"><i class="el-icon-link"></i>友情链接</router-link></template>
            </el-menu-item>

            <el-menu-item index="7">
              <template slot="title"><router-link to="/login_log"><i class="el-icon-key"></i>登录日志</router-link></template>
            </el-menu-item>

            <el-menu-item index="8">
              <template slot="title"><router-link to="/system_log"><i class="el-icon-switch-button"></i>系统日志</router-link></template>
            </el-menu-item>

            <el-menu-item index="9">
              <template slot="title"><router-link to="/setting"><i class="el-icon-setting"></i>系统设置</router-link></template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header style="text-align: right; height: 90px; font-size: 20px">
            <i class="el-icon-s-promotion" style="margin-right: 15px"></i>
            <el-dropdown>
              <el-avatar style="margin-top: 16px" shape="square" :size="50" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 0px;
    height: 90px;
  }

  .el-aside {
    color: #333;
  }
  a{
    text-decoration: none;
  }
</style>
