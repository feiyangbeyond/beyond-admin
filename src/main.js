// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router/index'
import axios from 'axios'

import App from './App'
import store from './store'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import moment from 'moment'

Vue.prototype.$moment = moment
Vue.prototype.axios = axios;
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(mavonEditor);

moment.locale('zh-cn');
//路由跳转前
router.beforeEach((to, from, next) => {
  //获取用户登录状态
  let isLogin = sessionStorage.getItem('isLogin');
  console.log(to.path);
  //注销
  if(to.path == '/logout'){
    //清空
    sessionStorage.clear();
    //跳转到登录
    next({path: '/login'});
  }else if(to.path == '/login'){
    if(isLogin != null){
      //跳转到首页
      next({path: '/home'});
    }
  }else if(isLogin == null){
    //跳转到登录页
    next({path: '/login'});
  }
  next();
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
