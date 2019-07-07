<template>
<div class="role">
    <!-- 面包屑 -->
 <el-breadcrumb separator="/">
  <el-breadcrumb-item >首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
 </el-breadcrumb>
 <!-- 表单 -->
   <el-table :data="rightlist" border >
    <el-table-column  type="index" width="50"></el-table-column>
    <el-table-column  prop="authName"  label="权限名称" width="180"></el-table-column>
    <el-table-column  prop="path"  label="路径" width="180"></el-table-column>
    <el-table-column  prop="level"  label="层级" width="180">
      <template slot-scope="scope">{{scope.row.level | levellist}}</template>
    </el-table-column>
  </el-table>

</div>
</template>

<script>
import { getright } from '../../api/right.js'
export default {
  data () {
    return {
      rightlist: []
    }
  },
  filters: {
    levellist (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  },
  mounted () {
    getright('list')
      .then(res => {
        console.log(res)
        this.rightlist = res.data.data
      })
  }

}
</script>
<style lang="less" scoped>

</style>
