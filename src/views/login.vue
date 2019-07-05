<template>
  <div class="login">
    <div class="container">
      <img src="../assets/1 (5).jpg" class="avatar" alt />
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username"  clearable prefix-icon="myicon myicon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input  type="password" v-model="ruleForm.password"   @keyup.enter.native="loginbtn" prefix-icon="myicon myicon-key" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="loginbtn">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 模块方法引入登陆验证
import { login } from '../api/user.js'
export default {

  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // required：必须的
          // message：不满足规则时的提示信息
          // trigger：什么时候触发：blur指失去焦点时触发
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码在 6 到 16位之间', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    loginbtn () {
      // 用户数据验证
      // console.log(this.$refs.ruleForm.validate);
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 用户输入正确，进行提交发送登入验证请求
          //  this.$message.success('welcome')
          // 调用接口方法实现用户登陆
          login(this.ruleForm)
            .then(res => {
              console.log(res.data.meta.status)
              if (res.data.meta.status === 200) {
                // tiaozhuan
              // 将token数据存储本地
                localStorage.setItem('heima_token', res.data.data.token)

                this.$message.success('welcome')
                this.$router.push({ name: 'home' })
              } else {
                this.$message.warning(res.data.meta.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message.error('数据输入错误，请重新输入')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color:gainsboro;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
