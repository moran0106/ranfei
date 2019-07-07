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
          <el-submenu index="/home" >
            <template slot="title" >
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/home/user">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>

            </el-menu-item>
          </el-submenu>
          <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/home/right">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
            <el-menu-item index="/home/role">
              <i class="el-icon-menu"></i>
              <span slot="title">角色管理</span>
            </el-menu-item>
          </el-submenu>
          <!-- 商品管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span slot="title">权限管理</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 订单管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span slot="title">权限管理</span>
            </el-menu-item>
            <el-menu-item index="4-2">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 数据统计 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span slot="title">权限管理</span>
            </el-menu-item>
            <el-menu-item index="5-2">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
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
export default {}
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
