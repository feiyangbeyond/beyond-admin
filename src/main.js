// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import ElementUI from 'element-ui'

import axios from 'axios'
import mavonEditor from 'mavon-editor'
import moment from 'moment'

import router from './router/index'
import store from './store'


import 'element-ui/lib/theme-chalk/index.css'
import 'mavon-editor/dist/css/index.css'
import './logger'
import './login'
import { version } from '../package.json'

Vue.prototype.VERSION = version;
Vue.prototype.$moment = moment;
Vue.prototype.axios = axios;
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(mavonEditor);

moment.locale('zh-cn');


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
