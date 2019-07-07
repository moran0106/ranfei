<template>
  <div class="right">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加按钮 -->
    <el-button type="primary" plain  style='margin-bottom:10px' >添加角色</el-button>
    <!-- 表单 -->
    <el-table :data="rolelist" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="first in scope.row.children" :key="first.id" style='margin-bottom:5px; border-bottom:1px mediumslateblue dashed'>
            <el-col :span="4">
              <el-tag closable @close="delright(scope.row,first.id)">{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id" style='margin-bottom:8px'>
                <el-col :span="4">
                  <el-tag closable @close="delright(scope.row,second.id)" type="success">{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20" >
                      <el-tag type="danger"  style='margin:0px 5px 5px 0px' @close="delright(scope.row,three.id)" v-for="three in second.children" :key="three.id" closable >{{three.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row >
             <el-col :span='24' v-show="scope.row.children.length===0">没有权限，请先分配</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色列表" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <!-- 操作 -->
        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
          <el-button type="primary" plain icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="分配" placement="top-start">
          <el-button type="success" plain icon="el-icon-check" @click="allotroledialog()"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
          <el-button type="danger" plain icon="el-icon-delete"></el-button>
        </el-tooltip>
      </el-table-column>
      </el-table>
      <!-- 添加分配权限对话框 -->
      <el-dialog title="收货地址" :visible.sync="allotroledialogVisible">
      <!-- 树形组件 -->
      <el-tree
     :data="rightlist"
     show-checkbox
     node-key="id"
     :default-expand-all='true'
     :default-checked-keys="[5]"
     :props="defaultProps">
  </el-tree>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import { getrolelist, delroleright } from '../../api/role.js'
import { getright } from '../../api/right.js'
export default {
  data () {
    return {
      rolelist: [],
      // 删除指定授权
      allotroledialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rightlist: []
    }
  },
  mounted () {
    getrolelist().then(res => {
      console.log(res)
      if (res.data.meta.status === 200) {
        this.rolelist = res.data.data
      }
    })
  },
  methods: {

    // 获取树形展开数据 授权角色权限
    allotroledialog () {
      this.allotroledialogVisible = true
      // 获取权限树形数据
      getright('tree')
        .then(res => {
          console.log(res)
          this.rightlist = res.data.data
          // if (res.data.meta.status === 200) {

          // }
        })
        .catch(err => {
          console.log(err)
        })
    },

    delright (row, rightId) {
      //   删除指定授权
      delroleright(row.id, rightId)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
          }
          // 重置当前展开行数据的数据源数组
          row.children = res.data.data
        })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
