<template>
  <div class="parent-div">
    <el-row><h3>文章管理</h3></el-row>
    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchArticle" style="width: 350px;">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button size="medium" type="primary" plain><i class="el-icon-search"></i></el-button>
      </el-col>
      <el-col :span="3" :offset="12">
        <el-button size="medium" type="primary" plain @click="addNew"><i class="el-icon-plus"></i></el-button>
        <el-button size="medium" type="primary" plain @click="getArticles"><i class="el-icon-refresh-right"></i></el-button>
        <el-button size="medium" type="primary" plain><i class="el-icon-printer"></i></el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%" border v-loading="loading">
      <el-table-column sortable label="编号" prop="id" width="75"></el-table-column>
      <el-table-column label="文章标题" prop="title"></el-table-column>
      <el-table-column label="作者" width="110" prop="author">
        <template slot-scope="scope">
          <el-tag size="medium" disable-transitions>{{scope.row.author}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column sortable label="最后一次编辑" prop="editTime" :formatter="dateFormat" width="150"></el-table-column>
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
        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        <el-button type="warning" icon="el-icon-edit" size="mini">编辑</el-button>
        <el-button type="primary" icon="el-icon-position" size="mini">预览</el-button>
      </el-table-column>
    </el-table>
    </el-row>
    <el-row>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalPage"></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Article",
      data() {
        return {
          loading: false,
          searchArticle: '',
          totalPage: 100,
          currentPage: 19,
          tableData: [{
            id: 1,
            title: '标题',
            author: '风不止',
            editTime: '2016-05-02',
            views: 11111,
            category: '测试',
            state: '0'
          }
          ],
          search: ''
        }
      },
      mounted(){
          this.loading = true;
          this.getArticles();
      },
      methods: {
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        dateFormat(row, column, cellValue, index){
          return  this.$moment(row.editTime).format("YYYY-MM-DD HH:mm")
        },
        addNew(){
          this.$router.push('/new')
        },
        getArticles(){
          this.axios.get('http://localhost:8080/api/getContents').then(res=>{
            this.tableData = res.data.data.articles;
            this.loading = false;
          })
        }
      },
    }
</script>

<style scoped>
.parent-div{
  padding: 35px;
  border-radius: 5px;
  box-shadow: 0 0 25px #DCDFE6;
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
