// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import store from '@/config/store.js'
import 'element-ui/lib/theme-chalk/index.css';
// import axios from 'axios'
import {post,fetch} from './config/request.js'
//定义全局变量
// Vue.prototype.$http = axios
// Vue.prototype.$post=post;
// Vue.prototype.$fetch=fetch;

Vue.use(ElementUI)
Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   if(to.meta.requireAuth){
//     if(store.getters.isLoign){
//       next()
//     }else{
//       next({path:'/login'})
//     }
//   }
//   else{
//     next()
//   }
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
