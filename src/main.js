import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios';
axios.defaults.headers.common['Authentication'] = store.state.token;
//axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes
})



// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
  }

//导航守卫
router.beforeEach((to, from, next) => {
  // store.commit('del_token');
  let user = sessionStorage.getItem('username');
  //console.log(to.path,store.state.token)

  // console.lo
  // debugger
  // if (to.matched.some(r => r.meta.requireAuth)) {//这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
  // if (!user && to.path != '/login') {
  //     next({ path: '/login' })
  //   } else {
  //     next()
  //   }

  if(store.state.token==''&&to.path != '/login'){
    next({ path: '/login' })
  }else{
    next()
  }
 

})



new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app')

