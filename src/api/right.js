import axios from '../api/comment.js'
// 获取权限数据
export const getright = (type) => {
  return axios({
    url: `rights/${type}`
  })
}

// 左侧菜单
export const leftmenu = () => {
  return axios({
    url: 'menus'
  })
}
