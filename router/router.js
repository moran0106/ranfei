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
import good from '../src/views/goods/good/good.vue'
import list from '../src/views/goods/good/list.vue'
import toadd from '../src/views/goods/good/toadd.vue'
import params from '../src/views/goods/params.vue'
import categories from '../src/views/goods/categories.vue'
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
          path: 'users',
          component: user
        },
        {
          name: 'role',
          path: 'roles',
          component: role
        },
        {
          name: 'right',
          path: 'rights',
          component: right
        },
        {
          name: 'good',
          path: 'goods',
          component: good,
          redirect: { name: 'list' },
          children: [
            {
              name: 'list',
              path: 'list',
              component: list
            },
            {
              name: 'toadd',
              path: 'toadd',
              component: toadd
            }
          ]

        },
        {
          name: 'params',
          path: 'params',
          component: params
        },
        {
          name: 'categories',
          path: 'categories',
          component: categories
        }

      ]
    }

  ]
})
