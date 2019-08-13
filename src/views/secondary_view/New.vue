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
          <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.name"></el-option>
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

    import articleApi from "../../api/article";
    import categoryApi from "../../api/category";

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
            options: [],
            value: [],
            a_from: '原创',
            site: 'https://www.tsxygfy.cn',
            writeTime: new Date()
          }
      },
      created(){
        this.getCategory();
      },
      methods:{
        handleClose(tag) {
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
        //获取页面文章信息
        getArticle(state){
          let title = this.title;
          let tags = [];
          let category = this.categories;
          let createTime = this.writeTime;
          let site = this.site;
          let a_from = this.a_from === '原创' ? 0 : 1;
          let content = this.$refs.md.d_value;
          let content_md = this.$refs.md.d_render;

          for(let i=0; i<this.dynamicTags.length; i++){
              let name = this.dynamicTags[i];
              let tag = {id: null ,name: name};
              tags.push(tag);
          }

          console.log(tags);

          let article1 = {
            title: title,
            // tags: tags,
            category: category,
            editTime: createTime,
            origin: site,
            type: a_from,
            content: content,
            contentMd: content_md,
            author: '风不止',
            state: state
          };
          let article = {tbArticle: article1, tags: tags};
          console.log(article);
          return article;
        },
        //发布文章
        publish(data){
          articleApi.add(this.getArticle('1')).then(res => {
            if (res.data.code === 200){
              this.$message.success("发布成功")
            }
          })
        },
        //保存草稿
        asDraft(data){
          articleApi.add(this.getArticle('0'))
        },
        //获取全部分类
        getCategory(){
          categoryApi.getAll().then(res => {
            this.options = res.data.data;
          })
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
    /*border: 1px solid #DCDFE6*/
    /*padding: 35px;*/
  }
</style>
