<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo"></div>
        <el-menu
          :router='true'
          :unique-opene="true"
          :default-active="'/home/role'"
          class="el-menu-vertical-demo"
          background-color=" rgb(108, 145, 192)"
          text-color="black"
          active-text-color="honeydew"
        >
          <!-- 用户管理 -->
          <el-submenu :index="first.id+''"  v-for="first in menulist" :key="first.id">
            <template slot="title" >
              <i class="el-icon-location"></i>
              <span>{{first.authName}}</span>
            </template>
            <el-menu-item :index="'/home/'+second.path"  v-for='second in first.children' :key='second.id'>
              <i class="el-icon-menu"></i>
              <span slot="title">{{second.authName}}</span>

            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn"></span>
          <h1 class="system-title">电商后台管理系统</h1>
          <a href="javascript:;" class="welcome">退出</a>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { leftmenu } from '../api/right.js'
export default {
  data () {
    return {
      menulist: []
    }
  },

  mounted () {
    leftmenu()
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.menulist = res.data.data
        }
      })
  }

}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
   align-items: center;
  background-color: rgb(108, 145, 192);
  color: white;
  font-size: 25px;
  line-height: 60px;
}
 .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #285e86;
    }
  }
.el-main {
  background: honeydew;
  height: 100%;
}
.el-aside {
  background: rgb(108, 145, 192);
}
.el-container {
  height: 100%;
}
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
</style>
