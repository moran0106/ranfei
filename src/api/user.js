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

// 实现用户登陆
export const login = (data) => {
  return axios({
    method: 'post',
    url: 'login',
    data
  })
}
// 获取页面数据动态生成
export const getUserList = (params) => {
  return axios({
    url: 'users',
    params
  })
}
// 获取添加数据
export const getaddList = (data) => {
  return axios({
    method: 'post',
    url: 'users',
    data
  })
}

// 删除数据
// 增加(post)    删除(delete)    修改(put)   查询(get)
export const deluser = (id) => {
  return axios({
    method: 'delete',
    url: `users/${id}`
  })
}

// 修改用户状态
export const updatauserstatus = (uid, type) => {
  return axios({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}

// 编辑用户

export const edituser = (data) => {
  return axios({
    method: 'put',
    url: `users/${data.id}`,
    data
  })
}

// 分配角色

export const allotuser =