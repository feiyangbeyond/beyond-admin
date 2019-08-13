<template>
  <div class="parent-div">
    <el-row><h3>系统日志</h3></el-row>
    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchLog" style="width: 350px;">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button size="medium" type="primary" plain><i class="el-icon-search"></i></el-button>
      </el-col>
      <el-col :span="3" :offset="12">
        <el-button size="medium" type="primary" plain @click="refresh"><i class="el-icon-refresh-right"></i></el-button>
        <el-button size="medium" type="primary" plain @click="printMachine"><i class="el-icon-printer"></i></el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%" border v-loading="loading">
        <el-table-column label="编号" prop="id" width="70"></el-table-column>
        <el-table-column label="用户名" prop="username" width="90"></el-table-column>
        <el-table-column label="操作" width="130" prop="operation"></el-table-column>
        <el-table-column label="耗时ms" prop="time" width="80">
          <template slot-scope="scope">
            <el-tag size="medium" disable-transitions>{{scope.row.time}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="调用方法" width="290" prop="method"></el-table-column>
        <el-table-column label="方法参数" prop="params" width="180"></el-table-column>
        <el-table-column label="IP地址" width="130" prop="ip">
          <template slot-scope="scope">
            <el-tag size="medium" disable-transitions>{{scope.row.ip}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="执行时间" width="150" prop="createTime" :formatter="dateFormat"></el-table-column>
        <el-table-column label="执行地点" prop="location" width="130"></el-table-column>
        <el-table-column label="操作">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteLog">删除</el-button>
        </el-table-column>

      </el-table>
    </el-row>
    <el-row>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage"></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
  import logApi from "../../api/log";

  export default {
    name: "SystemLog",
    data() {
      return {
        loading: false,  //加载动画
        searchLog: '', //搜索框
        totalPage: 0, //总页数
        currentPage: 1, //当前页
        pageSize: 10,//页面大小
        tableData: [{ //日志数据
          id: 1,     //id
          username: '', //用户名
          operation: '', //操作
          time: '', //耗时
          method: '', //调用方法
          params: '', //方法参数
          ip: '', //ip地址
          createTime: '', //执行时间
          location: '', //执行地点
        }
        ],
      }
    },
    created(){
      this.loading = true;
      this.getAll();
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getAll();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getAll();
      },
      //格式化时间
      dateFormat(row, column, cellValue, index){
        return  this.$moment(row.createTime).format("YYYY-MM-DD HH:mm")
      },
      //刷新按钮
      refresh(){
        this.loading = true;
        this.getAll();
      },
      //删除日志按钮  不提供
      deleteLog(){
        this.$notify.error({
          title: '错误',
          message: '不提供删除方法'
        });
      },
      //打印
      printMachine(){
        window.print();
      },
      getAll(){
        logApi.getSystemLog({pageNum: this.currentPage, pageSize: this.pageSize})
          .then(res => {
            this.totalPage = res.data.data.total;
            this.tableData = res.data.data.list;
            this.loading = false;
          })
          .catch(error => {
            this.$message.error(error)
          })
      }
    }
  }
</script>

<style scoped>
  .parent-div{
    padding: 35px 35px 3px 35px;
    /*border-radius: 5px;*/
    /*box-shadow: 0 0 15px #DCDFE6;*/
    max-width: 1400px;
    margin: 0 auto;
    background-color: #fff;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  h3{
    margin: 0 0;
  }
</style>
