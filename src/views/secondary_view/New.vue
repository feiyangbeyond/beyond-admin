<template>
  <div class="parentDiv">
    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入文章标题" v-model="title">
          <template slot="prepend">文章标题</template>
        </el-input>
      </el-col>
      <el-col :span="5" :offset="2">
        <el-select v-model="categories" clearable placeholder="请选择文章分类">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="addTag" @blur="addTag"></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showTag">+ 创建新的标签</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-input placeholder="http://example.com" v-model="site">
          <template slot="prepend">站点</template>
        </el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-radio-group v-model="a_from">
          <el-radio-button label="原创"></el-radio-button>
          <el-radio-button label="转载"></el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="4">
        <el-date-picker v-model="writeTime" type="datetime" placeholder="发布时间" default-time="12:00:00"></el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <mavon-editor :ishljs="true" v-model="content" ref="md"/>
    </el-row>
    <el-row style="float: right; margin-bottom: 15px;">
      <el-col>
        <el-button type="primary" plain @click="asDraft(getArticle())">存入草稿</el-button>
        <el-button type="primary" @click="publish(getArticle())">发布文章</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

    export default {
        name: "New",
      data(){
          return{
            content: '',
            title: '',
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            categories: '',
            options: [{
              value: 'HTML',
              label: 'HTML'
            }, {
              value: 'CSS',
              label: 'CSS'
            }, {
              value: 'JavaScript',
              label: 'JavaScript'
            }, {
              value: 'Java',
              label: 'Java'
            }],
            value: [],
            a_from: '原创',
            site: 'https://www.tsxygfy.cn',
            writeTime: new Date()
          }
      },
      methods:{
        deleteSome(tag) {
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showTag() {
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        },
        addTag() {
          let inputValue = this.inputValue;
          if (inputValue) {
            this.dynamicTags.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = '';
        },
        //获取文章信息
        getArticle(){
          let title = this.title;
          let tags = this.dynamicTags;
          let category = this.categories;
          let createTime = this.writeTime.toLocaleString();
          let site = this.site;
          let a_from = this.a_from;
          let content = this.$refs.md.d_value;
          let content_md = this.$refs.md.d_render;
          let article = {
            title: title,
            tags: tags,
            category: category,
            createTime: createTime,
            site: site,
            from: a_from,
            content: content,
            content_md: content_md
          };
          article = JSON.stringify(article);
          let a_html = this.$refs.md.d_render;
          let a_md = this.$refs.md.d_value;
          console.log(a_html);
          console.log(a_md);
          return article;
          //console.log(article)
        },
        //发布文章
        publish(data){
          let that = this;
          //console.log(data);
          that.axios
            .post('https://www.tsxygfy.cn', data)
            .then(res=> {
              //if(res){
                that.$message({
                  message: '发布成功！',
                  type: 'success'
                })
              //}
            })
            .catch(function (error) {
              that.$message({
                message: error.toString(),
                type: 'error'
              })
            });
        },
        asDraft(data){
          let that = this;
          that.axios
            .post('http://localhost:8081', data)
            .then(res=>{
              //if(res){
                that.$message({
                  message: '已保存到草稿！',
                  type: 'success'
                })
              //}
            })
            .catch(function (error) {
              that.$message({
                message: error.toString(),
                type: 'error'
              })
            });
        }
      }
    }

</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .markdown-body{
    height: 550px;
    max-width: 1390px;
    margin: 0 auto;
  }

  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .parentDiv{
    height: 738px;
    max-width: 1400px;
    margin: 0 auto;;
    overflow: hidden;
    background-color: #fff;
    padding: 20px 10px 10px 10px;
    border: 1px solid #DCDFE6
    /*padding: 35px;*/
  }
</style>
