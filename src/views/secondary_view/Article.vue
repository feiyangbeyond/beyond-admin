<template>
  <div class="parent-div" v-loading="loading">
    <el-row><h3>文章管理</h3></el-row>
    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchArticle" style="width: 350px;">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button size="medium" type="primary" plain><i class="el-icon-search"></i></el-button>
      </el-col>
      <el-col :span="4" :offset="11">
        <el-button size="medium" type="primary" plain @click="addNew"><i class="el-icon-plus"></i></el-button>
        <el-button size="medium" type="primary" plain @click="getArticles"><i class="el-icon-refresh-right"></i></el-button>
        <el-button size="medium" type="primary" plain @click="printMachine"><i class="el-icon-printer"></i></el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%" border>
      <el-table-column sortable label="编号" prop="id" width="75"></el-table-column>
      <el-table-column label="文章标题" prop="title"></el-table-column>
      <el-table-column label="作者" width="110" prop="author">
        <template slot-scope="scope">
          <el-tag size="medium" disable-transitions>{{scope.row.author}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column sortable label="更新时间" prop="editTime" :formatter="dateFormat" width="150"></el-table-column>
      <el-table-column label="浏览量" width="110" sortable prop="views">
        <template slot-scope="scope">
          <el-tag size="medium" disable-transitions>{{scope.row.views}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="文章分类" prop="category" width="140"></el-table-column>
      <el-table-column sortable prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag size="medium" :type="scope.row.state === '1' ? 'primary' : 'info'" disable-transitions>{{scope.row.state === '1' ? '已发布':'草稿'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteOne(scope.$index, scope.row)">删除</el-button>
          <el-button type="warning" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="primary" icon="el-icon-position" size="mini">预览</el-button>
        </template>
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
    import articleApi from "../../api/article";

    export default {
        name: "Article",
      data() {
        return {
          loading: false, //加载动画
          searchArticle: '', //搜索框
          totalPage: 0, //总页数
          currentPage: 1, //当前页
          pageSize: 10, //每页条目
          tableData: [{ //文章数据
            id: 1,
            title: '',
            author: '',
            editTime: '',
            views: 0,
            category: '',
            state: ''
          }
          ],

        }
      },
      created(){
          this.loading = true;
          this.getArticles();
      },
      methods: {
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.pageSize = val;
          this.getArticles();
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.getArticles();
        },
        //格式化日期
        dateFormat(row, column, cellValue, index){
          return  this.$moment(row.editTime).format("YYYY-MM-DD HH:mm")
        },
        //点击添加按钮  跳转到添加
        addNew(){
          this.$router.push('/new')
        },
        //获取文章
        getArticles(){
          articleApi.getAll({pageNum: this.currentPage, pageSize: this.pageSize})
            .then(res => {
              this.totalPage = res.data.data.total;
              this.tableData = res.data.data.list;
              this.loading = false;
            })
            .catch(error => {
              this.$message.error("服务异常")
            })
        },
        //删除一个
        deleteOne(index, row){
          this.$confirm('确认删除？')
            .then(_ => {
              console.log("确认删除"+index);
              console.log(index, row.id) //row是index行的全部数据 index从0开始
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
            })
            .catch(_ => {
              console.log("取消删除"+index);
            });
        },
        //打印
        printMachine(){
          window.print();
        },
      },
    }
</script>

<style scoped>
.parent-div{
  padding: 35px;
  border-radius: 5px;
  box-shadow: 0 0 10px #DCDFE6;
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
