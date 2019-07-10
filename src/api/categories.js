import axios from '../api/comment.js'

// 获取商品数据列表
export const getclassifylist = (type) => {
  return axios({
    url: 'categories',
    params: { type }
  })
}

// 获取分类参数列表
export const goodclassify = (id, sel) => {
  return axios({
    url: `categories/${id}/attributes`,
    params: { sel }
  })
}
