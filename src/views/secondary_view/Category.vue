<template>
  <div class="parent_div">
    <el-row :gutter="20">
      <br>
      <el-col :span="5" :offset="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>分类</span>
            <el-button style="float: right;" type="warning" icon="el-icon-plus" size="medium" circle @click="open()"></el-button>
          </div>
          <div v-for="c in categories" :key="c.id" class="text item">
            {{c.name}}
            <el-button style="float: right;" type="primary" size="mini" icon="el-icon-edit" @click="open(c.id, c.name)"></el-button>
            <el-button style="float: right; margin-right: 8px" type="danger" size="mini" icon="el-icon-delete" @click="deleteSome(c.id, 1)"></el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="5" :offset="2  ">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>标签</span>
            <el-button style="float: right;" type="warning" size="medium" icon="el-icon-plus" circle @click="open()"></el-button>
          </div>
          <div v-for="t in tags" :key="t.id" class="text item">
            {{t.name}}
            <el-button style="float: right;" type="primary" size="mini" icon="el-icon-edit" @click="open(t.id, t.name)"></el-button>
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
    export default {
        name: "Category",
      data(){
          return{
            deleteOne: false, //删除确定框
            categories: [
              {"id": 1, "name": "测试分类1"},
              {"id": 2, "name": "测试分类2"},
              {"id": 3, "name": "测试分类3"},
              {"id": 4, "name": "测试分类4"},
              {"id": 5, "name": "测试分类5"}
            ],
            tags: [
              {"id": 1, "name": "测试标签1"},
              {"id": 2, "name": "测试标签2"},
              {"id": 3, "name": "测试标签3"},
              {"id": 4, "name": "测试标签4"},
              {"id": 5, "name": "测试标签5"}
            ]
          }
      },
      methods:{
        deleteSome(id, type) {
          let d = type === 1 ? "分类" : "标签";
          this.$confirm('确认删除？')
            .then(_ => {
              console.log("确认删除"+d+id);
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
            })
            .catch(_ => {
              console.log("取消删除"+d+id);
            });
        },

        open(id, name) {
          this.$prompt('请输入名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue: name
          }).then(({ value }) => {
            this.$notify({
              type: 'success',
              message: '你的输入的是: ' + id + value
            });
          }).catch(() => {
            this.$notify({
              type: 'info',
              message: '取消输入'
            });
          });
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
