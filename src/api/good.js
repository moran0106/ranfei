import axios from '../api/comment.js'

// 获取商品列表数据
export const getgoodlist = (params) => {
  return axios({
    url: 'goods',
    params
  })
}

// 添加商品
export const goodsadd = (data) => {
  return axios({
    url: 'goods',
    method: 'post',
    data
  })
}
