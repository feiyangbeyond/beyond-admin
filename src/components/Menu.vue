<template>

    <el-menu class="elmenu" active-text-color="#1890ff" mode="horizontal">
      <el-menu-item index="1">
        <template slot="title"><router-link to="/profile"><i class="el-icon-s-home"></i>首页</router-link></template>
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
        <template slot="title"><router-link to="/log/login"><i class="el-icon-key"></i>登录日志</router-link></template>
      </el-menu-item>
      <el-menu-item index="8">
        <template slot="title"><router-link to="/log/system"><i class="el-icon-switch-button"></i>系统日志</router-link></template>
      </el-menu-item>
      <el-menu-item index="9">
        <template slot="title"><router-link to="/setting"><i class="el-icon-setting"></i>系统设置</router-link></template>
      </el-menu-item>
    </el-menu>

</template>

<script>
    export default {
        name: "Menu"
    }
</script>

<style scoped>
  a{
    color: #1890ff;
    background-color: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    -webkit-transition: color .3s;
    transition: color .3s;
  }

</style>
