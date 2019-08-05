<template>
  <div class="parent_div">
    <el-row :gutter="20">
      <br>
      <el-col :span="5" :offset="6">
        <el-card class="box-card" v-loading="loading1">
          <div slot="header" class="clearfix">
            <span>分类</span>
            <el-button style="float: right;" type="warning" icon="el-icon-plus" size="medium" circle @click="openAdd(1)"></el-button>
          </div>
          <div v-for="c in categories" :key="c.id" class="text item">
            {{c.name}}
            <el-button style="float: right;" type="primary" size="mini" icon="el-icon-edit" @click="openUpdate(c.id, c.name, 1)"></el-button>
            <el-button style="float: right; margin-right: 8px" type="danger" size="mini" icon="el-icon-delete" @click="deleteSome(c.id, 1)"></el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="5" :offset="2  ">
        <el-card class="box-card" v-loading="loading2">
          <div slot="header" class="clearfix">
            <span>标签</span>
            <el-button style="float: right;" type="warning" size="medium" icon="el-icon-plus" circle @click="openAdd(2)"></el-button>
          </div>
          <div v-for="t in tags" :key="t.id" class="text item">
            {{t.name}}
            <el-button style="float: right;" type="primary" size="mini" icon="el-icon-edit" @click="openUpdate(t.id, t.name, 2)"></el-button>
            <el-button style="float: right; margin-right: 8px" type="danger" size="mini" icon="el-icon-delete" @click="deleteSome(t.id, 2)"></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="提示" :visible.sync="deleteOne" width="30%" :before-close="deleteSome">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteOne = false">取 消</el-button>
        <el-button type="primary" @click="deleteOne= false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
    import categoryApi from "../../api/category";
    import tagApi from "../../api/tag";

    export default {
        name: "Category",
      data(){
        return{
          deleteOne: false, //删除确定框
          categories: [],
          tags: [],
          loading1: false,
          loading2: false
        }
      },
      created(){
        this.loading1 = true;
        this.loading2 = true;
        this.getCategory();
        this.getTag();
      },
      methods:{
        deleteSome(id, type) {
          let d = type === 1 ? "分类" : "标签";
          this.$confirm('确认删除？')
            .then(_ => {
              if(type === 1){
                this.loading1 = true;
                categoryApi.deleteOne(id);
                this.getCategory();
              }else if(type === 2){
                this.loading2 = true;
                tagApi.deleteOne(id);
                this.getTag();
              }
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
            });
        },

        openUpdate(id, name, type) {
          this.$prompt('请输入名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue: name
          }).then(({ value }) => {
            if(type === 1){//更新分类
              this.loading1 = true;
              categoryApi.updateOne({id: id, name: value});
              this.getCategory();
            }else if(type === 2){//更新标签
              this.loading2 = true;
              tagApi.updateOne({id: id, name: value});
              this.getTag();
            }
            this.$notify({type: 'success', message: '更新成功: ' + value});
          });
        },

        openAdd(type){
          this.$prompt('请输入名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            if(type === 1){//新增分类
              this.loading1 = true;
              categoryApi.addOne({name: value});
              this.getCategory();
            }else if(type === 2){//新增标签
              this.loading2 = true;
              tagApi.addOne({name: value});
              this.getTag();
            }
            this.$notify({type: 'success', message: '新增成功: ' + value});
          });
        },
        getCategory(){
          categoryApi.getAll().then(res => {
            this.categories = res.data.data;
          });
          this.loading1 = false;
        },
        getTag(){
          tagApi.getAll().then(res => {
            this.tags = res.data.data;
          });
          this.loading2 = false;
        }
      }
    }
</script>

<style scoped>
  .text {
    font-size: 18px;
    text-align: left;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 400px;
  }
  span{
    font-size: 23px;
    font-weight: bolder;
  }
  .parent-div{
    max-width: 1400px;
    margin: 0 auto;
  }
</style>
