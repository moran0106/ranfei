// 用于角色管理
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = localStorage.getItem('heima_token')
  config.headers.Authorization = token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 获取角色列表数据
export const getrolelist = () => {
  return axios({
    url: 'roles'
  })
}

// 删除角色指定权限
export const delroleright = (roleId, rightId) => {
  return axios({
    method: 'delete',
    url: `roles/${roleId}/rights/${rightId}`
  })
}

// 角色授权接口   roleId:角色id  rids:权限 ID 列表
export const roleallot = (roleId, rids) => {
  return axios({
    method: 'post',
    url: `roles/${roleId}/rights`,
    data: { rids }
  })
}

// 删除角色
export const delrole = (id) => {
  return axios({
    url: `roles/${id}`,
    method: 'delete'
  })
}
