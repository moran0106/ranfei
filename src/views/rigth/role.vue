<template>
  <div class="right">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加按钮 -->
    <el-button type="primary" plain style="margin-bottom:10px">添加角色</el-button>
    <!-- 表单 -->
    <el-table :data="rolelist" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            v-for="first in scope.row.children"
            :key="first.id"
            style="margin-bottom:5px; border-bottom:1px mediumslateblue dashed"
          >
            <el-col :span="4">
              <el-tag closable @close="delright(scope.row,first.id)">{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id" style="margin-bottom:8px">
                <el-col :span="4">
                  <el-tag
                    closable
                    @close="delright(scope.row,second.id)"
                    type="success"
                  >{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    type="danger"
                    style="margin:0px 5px 5px 0px"
                    @close="delright(scope.row,three.id)"
                    v-for="three in second.children"
                    :key="three.id"
                    closable
                  >{{three.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-show="scope.row.children.length===0">没有权限，请先分配</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色列表" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <!-- 操作 -->
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button type="primary" plain icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配" placement="top-start">
            <el-button
              type="success"
              plain
              icon="el-icon-check"
              @click="allotroledialog(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" plain icon="el-icon-delete" @click="roledel(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加分配权限对话框 -->
    <el-dialog title="收货地址" :visible.sync="allotroledialogVisible">
      <!-- 树形组件 -->
      <el-tree
        ref="mytree"
        :data="rightlist"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="chekearr"
        :props="defaultProps"
      ></el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="allotroledialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotright">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色对话框 -->

  </div>
</template>

<script>
import { getrolelist, delroleright, roleallot, delrole } from '../../api/role.js'
import { getright } from '../../api/right.js'
export default {
  data () {
    return {
      rolelist: [],
      roleid: '',
      // 删除指定授权
      allotroledialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rightlist: [],
      chekearr: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 删除角色
    roledel (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delrole(id)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 200) {
                this.$$message.success(res.data.meta.msg)
                this.init()
              }
            })
            .catch(err1 => {
              this.$message.error('删除失败')
            })
        })
        .catch(() => {
          this.$message.danger('取消删除')
        })
    },
    init () {
      getrolelist().then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.rolelist = res.data.data
        }
      })
    },
    // 获取树形展开数据 授权角色权限
    allotroledialog (row) {
      console.log(row)
      // 存储角色id
      this.roleid = row.id
      this.allotroledialogVisible = true
      // 获取权限树形数据
      getright('tree')
        .then(res => {
          console.log(res)
          this.rightlist = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
      // 获取角色对应的三级id
      this.chekearr.length = 0
      row.children.forEach((first, index) => {
        console.log(first.children)
        if (first.children && first.children.length > 0) {
          first.children.forEach(second => {
            if (second.children && second.children.length > 0) {
              second.children.forEach(three => {
                this.chekearr.push(three.id)
              })
            }
          })
        }
        // console.log(this.chekearr)
      })
    },
    // 分配授权
    allotright () {
      // roleid在row里，先定义角色roleid，再存储
      // roleallot(this.roleId, rids)
      var arr = this.$refs.mytree.getCheckedNodes()
      // console.log(arr)
      // [{id:116},pid:{104 101}],[{id:112},{121,101}]
      var temp = []
      for (var i = 0; i < arr.length; i++) {
        temp.push(arr[i].id + ',' + arr[i].pid)
        // 将temp转换字符串
        var str = temp.join(',')
        // 只有数组去重，
        var str1 = str.split(',')
        // 去重 new set    ...数据对象展开
        var arrend = [...new Set(str1)]

        console.log(this.roleid)
        roleallot(this.roleid, arrend.join(','))
          .then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              this.$message.success('授权成功')
              this.allotroledialogVisible = false
              this.init()
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.danger('授权失败')
          })
      }
    },
    delright (row, rightId) {
      //   删除指定授权
      delroleright(row.id, rightId).then(res => {
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
