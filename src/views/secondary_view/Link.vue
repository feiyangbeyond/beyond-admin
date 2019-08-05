<template>
  <div class="page-header-index-wide">
    <el-row :gutter="12">
      <el-col :offset="2" :xl="8" :lg="10" :md="10" :sm="24" :xs="24" :style="{ 'padding-bottom': '12px' }">
        <el-card :title="title">
          <el-form layout="horizontal">
            <el-form-item label="网站名称：">
              <el-input v-model="link.name" />
            </el-form-item>
            <el-form-item label="网站地址：">
              <el-input v-model="link.url" />
            </el-form-item>
            <el-form-item label="Logo：">
              <el-input v-model="link.img" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleSaveClick" v-if="formType==='create'">保 存</el-button>
              <el-button-group v-else>
                <el-button type="primary" @click="handleSaveClick">更 新</el-button>
                <el-button type="dashed" @click="handleCancelClick" v-if="formType==='update'">返回添加</el-button>
              </el-button-group>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :offset="2" :xl="10" :lg="14" :md="14" :sm="24" :xs="24" :style="{ 'padding-bottom': '12px' }">
        <el-card>
          <el-table :data="links" :loading="loading" :rowKey="links => links.id">
            <el-table-column prop="name" label="网站名称"></el-table-column>
            <el-table-column label="网站链接">
              <template slot-scope="scope">
                <el-button size="medium" type="text"><a :href="scope.row.url" target="_blank">{{scope.row.url}}</a></el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="handleEditLink(scope.row)" type="text" size="small">编辑</el-button><el-divider direction="vertical"></el-divider>
                <el-button @click="handleDeleteLink(scope.row.id)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import linkApi from "../../api/link";

  export default {
    data() {
      return {
        formType: 'create',
        data: [],
        loading: false,
        links: [],
        link: {
          id: '',
          name: '',
          url: '',
          img: ''
        }
      }
    },
    computed: {
      title() {
        if (this.link.id) {
          return '修改友情链接'
        }
        return '添加友情链接'
      }
    },
    created() {
      this.loadLinks()
    },
    methods: {
      loadLinks() {
        this.loading = true;
        linkApi.listAll().then(response => {
          this.links = response.data.data;
          this.loading = false
        })
      },
      handleSaveClick() {
        this.createOrUpdateLink()
      },
      handleAddLink() {
        this.formType = 'create';
        this.link = {}
      },
      handleEditLink(row) {
        this.link.id = row.id;
        this.link.name = row.name;
        this.link.url = row.url;
        this.link.img = row.img;
        this.formType = 'update'
      },
      handleDeleteLink(id) {
        linkApi.delete(id).then(response => {
          this.$message.success('删除成功！');
          this.loadLinks()
        })
      },
      handleCancelClick(){
        this.link.id = '';
        this.link.name = '';
        this.link.url = '';
        this.link.img = '';
        this.formType = 'create'

      },
      createOrUpdateLink() {
        if (this.link.id) {
          linkApi.update(this.link.id, this.link).then(response => {
            this.$message.success('更新成功！');
            this.loadLinks()
          })
        } else {
          linkApi.create(this.link).then(response => {
            this.$message.success('保存成功！');
            this.loadLinks()
          })
        }
        this.handleAddLink()
      }
    }
  }
</script>

<style scoped>
  .page-header-index-wide{
    max-width: 1400px;
    margin: 0 auto;
  }
</style>
