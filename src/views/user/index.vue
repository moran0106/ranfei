<template>
     <!-- 面包屑 -->
    <div class="user">
    <el-breadcrumb separator="/">
  <el-breadcrumb-item >首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
 </el-breadcrumb>
 <!-- 搜索 -->
   <div style="margin-top: 15px;">
  <el-input  v-model="user.query" placeholder="请输入内容"  @keyup.8.native='search1' @keyup.enter.native='search' class="input-with-select" style='width:300px;margin-right=10px;'>
  <el-button slot="append" icon="el-icon-search" @click='search'></el-button>
  </el-input>
  <el-button style="margin-left:5px;"  @click="addDialogFormVisible = true" type="primary">添加用户</el-button>
  </div>
  <!-- 表单 -->
  <template>
  <el-table
    :data="userList"
    border
    style="width: 100%">
      <el-table-column type="index" width="50">    </el-table-column>
    <el-table-column  prop="username"  label="用户名"  width="180"> </el-table-column>
    <el-table-column  prop="mobile"  label="电话"  width="180"> </el-table-column>
    <el-table-column  prop="email"  label="邮箱"  width="180"> </el-table-column>
    <!-- 修改状态 -->
    <el-table-column label="修改状态" width="100">
        <template slot-scope="scope">
         <el-switch v-model="scope.row.mg_state" @change="changestatus(scope.row.id, scope.row.mg_state)" active-color="#67C23A" inactive-color="#F56C6C"></el-switch>
        </template>
    </el-table-column>
    <!-- 操作 -->
     <el-table-column label="操作">
      <template slot-scope="scope">
    <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
       <el-button type="primary" plain icon="el-icon-edit" @click='showeditdilog(scope.row)'></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="分配" placement="top-start">
       <el-button type="success" plain icon="el-icon-check" @click="showallotdilog(scope.row)"></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
      <el-button type="danger" plain icon="el-icon-delete" @click='deluserdata(scope.row.id)'></el-button>
    </el-tooltip>
    <!-- 添加对话框 -->
    <el-dialog ref="addList" title="添加列表" :visible.sync="addDialogFormVisible">
    <el-form :model="addList" :rules='rules' ref="addList">
    <el-form-item  prop="username" label="用户名" :label-width="'100px'">
      <el-input v-model="addList.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码" :label-width="'100px'">
      <el-input v-model="addList.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  prop="mobile" label="电话" :label-width="'100px'">
      <el-input v-model="addList.mobile" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item   prop="email" label="邮箱" :label-width="'100px'">
      <el-input v-model="addList.email" auto-complete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="getaddList">确 定</el-button>
  </div>
</el-dialog>

   <!-- 编辑对话框 -->
    <el-dialog ref="editList" title="编辑用户" :visible.sync="editDialogFormVisible">
    <el-form :model="editList" :rules='rules' ref="editList">
    <el-form-item  prop="username" label="用户名" :label-width="'100px'">
      <el-input v-model="editList.username" auto-complete="off"  disabled></el-input>
    </el-form-item>
    <el-form-item  prop="mobile" label="电话" :label-width="'100px'">
      <el-input v-model="editList.mobile" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item   prop="email" label="邮箱" :label-width="'100px'">
      <el-input v-model="editList.email" auto-complete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="getedituser">确 定</el-button>
  </div>
</el-dialog>
     <!-- 分配角色对话框 -->

    <el-dialog  title="分配角色" :visible.sync="allotDialogFormVisible">
    <el-form :model="allotList" :label-width="'120px'" >
    <el-form-item  label="用户名">
      <el-input v-model="allotList.username" auto-complete="off"  style="width:120px" disabled></el-input>
    </el-form-item>
    <el-form-item  label="角色" >
     <el-select v-model="allotList.rid" clearable placeholder="请选择">
    <el-option
      v-for="item in rolelist"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
   </el-select>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="allotDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="changeallotuser">确 定</el-button>
  </div>
</el-dialog>

      </template>
    </el-table-column>
  </el-table>
</template>
 <!-- 分页 -->
  <!-- current-page 当前页数 -->
  <!-- query 用户搜索关键字 -->
  <!-- page-sizes  页码数 -->
  <!-- page-size 当前页显示数量 -->
<div class="block">
    <span class="demonstration"></span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="user.pagenum"
      :page-sizes="[3,6,9,12]"
      :page-size="user.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="user.total">
    </el-pagination>
  </div>
 </div>

</template>
<script>
import { getUserList, getaddList, deluser, updatauserstatus, edituser, allotuser } from '../../api/user.js'
import { getrolelist } from '../../api/role.js'
export default {
  data () {
    return {
      // xianze下拉列表数据
      value4: '',
      // 分配框的下拉列表shuju
      rolelist: [],
      // 分配角色
      allotList: {
        username: '',
        id: '',
        rid: ''
      },
      allotDialogFormVisible: false,
      // 编辑
      editList: {
        username: '',
        email: '',
        mobile: ''
      },
      editDialogFormVisible: false,
      // 添加数据
      addList: {
        username: '',
        password: '',
        email: '123@134.com',
        mobile: '13523456781'
      },
      addDialogFormVisible: false,
      // 用户数据数组
      userList: [ ],
      user: {
        query: '',
        pagenum: 1,
        pagesize: 3,
        total: 0
      },
      rules: {
      // 验证用户名
        username: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
        // 验证密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码在 6 到 16位之间', trigger: 'blur' }
        ],
        // 验证邮箱
        email: [
          { required: true, message: '请输入email', trigger: 'blur', pattern: /\w+[@]\w+[.]\w{2,3}/ }
        ],
        // dinhua
        mobile: [
          { required: true, message: '请输入您的手机号', trigger: 'blur', pattern: /^1[345678]\d{9}$/ }
        ]
      }

    }
  },
  mounted () {
    this.init()
    // 获取所有列表数据
    getrolelist()
      .then(res => {
        if (res.data.meta.status === 200) {
          this.rolelist = res.data.data
        }
      })
  },
  methods: {
    // 显示分配角色
    showallotdilog (row) {
      this.allotDialogFormVisible = true
      this.allotList.username = row.username
      this.allotList.id = row.id
      this.allotList.rid = row.rid
    },

    // 判断是否选择角色
    changeallotuser () {
      if (!this.allotList.rid) {
        this.$message.warning('请先选择角色')
        return false
      }
      // 获取分配角色数据
      console.log(this.allotList.rid)
      allotuser(this.allotList.id, this.allotList.rid)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            this.allotDialogFormVisible = false
          }
        })
    },
    // 编辑
    showeditdilog (row) {
      // console.log(row)
      this.editDialogFormVisible = true
      this.editList.id = row.id
      this.editList.username = row.username
      this.editList.email = row.email
      this.editList.mobile = row.mobile
    },
    getedituser () {
      this.$refs.editList.validate(valid => {
        if (valid) {
          // console.log(this.editList)
          edituser(this.editList)
            .then(res => {
              // console.log(res, 'thfdghdg')
              if (res.data.meta.status === 200) {
                this.$message.success('编辑成功')
                this.editDialogFormVisible = false
                this.init()
              }
            })
            .catch(err => {
              console.log(err)
              this.$message.error('编辑失败!')
            })
        }
      })
    },
    // 修改用户状态
    changestatus (id, type) {
      // console.log(id, type)
      updatauserstatus(id, type)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success('修改成功!')
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('修改失败!')
        })
    },
    // 删除用户
    deluserdata (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 点击确定执行
        .then(() => {
          deluser(id)
            .then(res => {
              // console.log(res)
              if (res.data.meta.status === 200) {
                // 判断删除之后，当前页还有没有数据，如果有数据，就保持页码为当前页，否则就到上一页
                this.user.pagenum = Math.ceil((this.user.total - 1) / this.user.pagesize) < this.user.pagenum ? --this.user.pagenum : this.user.pagenum
                this.init()
                this.$message.success('删除成功!')
              }
            })
            .catch(err1 => {
              this.$message.error('删除失败')
            })
        })
        // dianjiquxiaozhixing
        .catch(() => {
          this.$message.warning('已取消删除')
        })
    },
    // tianjiabiaodan
    getaddList () {
      this.$refs.addList.validate(valid => {
        if (valid) {
          getaddList(this.addList)
            .then(res => {
              // console.log(res)
              if (res.data.meta.status === 201) {
                this.addDialogFormVisible = false
                this.$refs.addList.resetFields()
                this.$message.success('添加成功')
                this.init()
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          return false
        }
      })
    },
    // fenye
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.user.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.user.pagenum = val
      this.init()
    },
    init () {
      getUserList(
        this.user
      )
        .then(res => {
          console.log(res)
          this.userList = res.data.data.users
          this.user.total = res.data.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    search () {
      this.init()
    },
    search1 () {
      if (this.user.query.length === 0) {
        this.init()
      }
    }

  }
}
</script>

<style lang="less" scoped>

</style>
