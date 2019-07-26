<template>
    <div>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-box">
        <h3 class="login-title">欢迎登录</h3>
        <el-form-item label="账号" prop="username">
          <el-input placeholder="请输入账号" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
      data() {
        return {
          form: {
            username: '',
            password: ''
          },
          rules: {
            username: [
              { required: true, message: '请输入账号', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
          },
          loading: true
        }
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              sessionStorage.setItem('isLogin', this.form.username);
              this.$router.push('/home');
            } else {
              this.$message({
                message: '验证失败',
                type: 'warning'
              });
              return false;
            }
          });
        },
      }
    }
</script>

<style lang="scss" scoped>
  .login-box{
    width: 350px;
    margin: 180px auto;
    border: 1px solid #DCDFE6;
    padding: 35px;
    border-radius: 5px;
    box-shadow: 0 0 25px #DCDFE6;
  }
  .login-title{
    text-align: center;
  }
</style>
