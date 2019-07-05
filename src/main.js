import Vue from 'vue'
import App from './App.vue'
import router from '../router/router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 网站全局样式和重置样式
import '../src/styles/index.less'
Vue.use(ElementUI)

Vue.config.productionTip = false
// tianjiaruyoudaohangshouwei
router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('heima_token')
  if (token || to.path === '/login') {
    next()
  } else if (!token && to.path !== '/login') {
    next({ name: 'login' })
  }
})
new Vue({
  // 注入router
  router,
  render: h => h(App)
}).$mount('#app')
