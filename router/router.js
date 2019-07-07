// 引入vue
import Vue from 'vue'
// 引入Router
import VueRouter from 'vue-router'
// 引入组件页面
import login from '../src/views/login.vue'
import home from '../src/views/home.vue'
import welcome from '../src/views/welcome.vue'
import user from '../src/views/user/index.vue'
import role from '../src/views/rigth/role.vue'
import right from '../src/views/rigth/right.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'home',
      path: '/home',
      component: home,
      redirect: { path: '/home/welcome' },
      children: [
        {
          path: 'welcome',
          component: welcome
        },
        {
          name: 'user',
          path: 'user',
          component: user
        },
        {
          name: 'role',
          path: 'role',
          component: role
        },
        {
          name: 'right',
          path: 'right',
          component: right
        }
      ]
    }

  ]
})
