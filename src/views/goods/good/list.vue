<template>
  <div class="list">
    <!-- 商品列表  面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <div style="margin-top: 15px;">
      <el-input
        v-model="goodobj.query"
        placeholder="请输入内容"
        class="input-with-select"
        style="width:300px;margin-right=10px;"
        @keyup.enter.native='init'
      >
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <!-- 添加按钮 -->
      <el-button style="margin:0 0 15px 5px;"   plain type="warning" @click="addDialogFormVisible=true; $router.push({name: 'toadd'})"  >添加商品</el-button>
    </div>
    <!-- 表单 -->
    <el-table :data="goodlist" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="360"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="100"></el-table-column>
      <el-table-column prop="goods_state" label="商品状态" width="100"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="100"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="" content="编辑" placement="top-start">
            <el-button type="primary" plain icon="el-icon-edit"  @click="deluserdata(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配" placement="top-start">
            <el-button type="success" plain icon="el-icon-check" @click="deluserdata(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" plain icon="el-icon-delete" @click="deluserdata(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!--  分页-->
    <div class="block">
    <span class="demonstration"></span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goodobj.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="goodobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodobj.total">
    </el-pagination>
  </div>
  </div>
</template>
<script>
import { getgoodlist } from '../../../api/good.js'
export default {
  data () {
    return {
      goodlist: [],
      addDialogFormVisible: false,
      goodobj: {
        query: '',
        pagenum: 1, // 当前页
        pagesize: 10, // 当前页显示量
        total: 0
      }
    }
  },
  mounted () {
    // 商品列表数据
    this.init()
  },
  methods: {
    // fenye
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.goodobj.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.goodobj.pagenum = val
      this.init()
    },
    init () {
      getgoodlist(this.goodobj)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.goodlist = res.data.data.goods
            this.goodobj.total = res.data.data.total
          }
        })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
 <style lang="less" scoped>
</style>
