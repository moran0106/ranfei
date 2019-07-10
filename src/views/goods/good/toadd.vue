<template>
  <div class="add">
    <!-- 商品列表  面包屑 -->
    <el-breadcrumb separator="/" style="margin-bottom:0px; background:#ddd">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加商品信息 -->
    <el-breadcrumb>
      <el-breadcrumb-item>添加商品信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 步骤条 -->
    <el-steps :active="activeName-0" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <el-form ref="addform" :model="addform" label-width="80px">
      <el-tabs v-model="activeName" tab-position="left" style="margin-top:10px">
        <el-tab-pane label="基本信息" name="0">
          <el-form-item label="商品名称">
            <el-input v-model="addform.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="addform.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="addform.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="addform.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- 级联选择器 -->
            <div class="block">
              <span class="demonstration"></span>
              <el-cascader :options="getclassifylist" :props="classifyprop" clearable  @change="classifychage" ></el-cascader>
            </div>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
              class="upload-demo"
              action="http://localhost:8888/api/private/v1/upload"
              :on-success='imgsuccess'
              :before-upload='beforeUpload'
              :headers='gettoken()'
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
               <el-button size="small" type="primary">点击上传</el-button>
               <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
        <quill-editor
            v-model="addform.goods_introduce"
            ref="myQuillEditor"
            :options="editorOption"
             style='height:400px;border-bottom:1px solid #ccc'
        >
        </quill-editor>

        </el-tab-pane>
      </el-tabs>
        <el-button type="primary" @click="addgoods">添加商品</el-button>
    </el-form>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { getclassifylist } from '../../../api/categories.js'
import { goodsadd } from '../../../api/good.js'
export default {
  components: {
    quillEditor
  },
  data () {
    return {

      // 文件上传数组
      fileList: [],
      editorOption: {},
      classifyprop: {
        checkStrictly: true,
        label: 'cat_name',
        value: 'cat_id',
        children: 'children' },
      getclassifylist: [],
      addform: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        goods_introduce: '',
        pics: [],
        attrs: []

      },
      activeName: '0'
    }
  },
  mounted () {
    getclassifylist(3)
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.getclassifylist = res.data.data
        }
      })
  },
  methods: {
    // 图片上传之前判断格式
    beforeUpload (file) {
      console.log(file)
      if (file.type.indexOf('image/') === -1) {
        this.$message({
          type: 'warning',
          message: '请选择图片格式的文件'
        })
        return false
      }
    },
    // 移除图片
    handleRemove (file, fileList) {
      if (!file.response) {
        return
      }
      for (var i = 0; i < this.addform.pics.length; i++) {
        if (this.addform.pics[i] === file.response.data.tem_path) {
          this.addform.pics.splice(i, 1)
        }
      }
    },
    // 图片上传成功的钩子函数
    imgsuccess (response, file, fileList) {
      console.log(response)
      this.addform.pics.push({ pic: response.data.tmp_path })
    },
    gettoken () {
      var token = localStorage.getItem('heima_token')
      return { Authorization: token }
    },

    // 级联选择器切换事件
    classifychage (value) {
      this.addform.goods_cat = value.join(',')
      console.log(this.addform.goods_cat)
    },
    // 添加商品按钮
    addgoods () {
      goodsadd(this.addform)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 201) {
            this.$router.push({ name: 'list' })
          }
        })
    }
  }
}
</script>

 <style lang="less" scoped>
</style>
