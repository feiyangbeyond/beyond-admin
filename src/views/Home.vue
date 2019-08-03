<template>
      <el-container><!--style="max-width: 1500px; margin: 0 auto;background: #f0f2f5" -->
        <el-header>
<!--          <el-row>-->
<!--            <el-col :span="2"><Logo/></el-col>-->
<!--            <el-col :span="15"><Menu/></el-col>-->
<!--          </el-row>-->
          <Menu/>
        </el-header>

        <el-main>
          <Main/>
        </el-main>
        <el-footer>
          <Footer/>
        </el-footer>

      </el-container>
</template>

<script>
  import Logo from '../components/Logo'
  import Menu from '../components/Menu'
  import Main from '../components/Main'
  import Footer from '../components/Footer'
    export default {
        name: "Home",
      components: {
        Menu,
        Logo,
        Main,
        Footer
      }
    }
</script>

<style scoped>
  .el-header{
    text-align: center;
    max-width: 1500px;
    margin: 0 auto;
  }


  .el-main {
    text-align: center;
    height: 790px;
    padding-bottom: 0;
    background-color: #f0f2f5;
    /*line-height: 160px;*/
  }
  .el-footer{
    background-color: #f0f2f5;
    height: 100%;
  }
</style>
