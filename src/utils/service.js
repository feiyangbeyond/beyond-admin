import axios from 'axios'
import Vue from 'vue'
import { Message } from 'element-ui';
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '../router'

//封装axios
const service = axios.create({
  baseURL: ``,
  timeout: 5000,
  withCredentials: true
});

//请求拦截器
service.interceptors.request.use(
  config => {
    //为请求设置token
    setTokenToHeader(config);
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

//响应拦截器
service.interceptors.response.use(
  response => {
    NProgress.done();
    return response
  },
  error => {
    NProgress.done();

    //取消请求
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    //失败
    const response = error.response;
    const status = response ? response.status : -1;
    const data = response ? response.data : null;

    if (data) {
      let handled = false;
      if (data.status) {
          handled = true;
        console.log(data.status);
        Message({
          showClose: true,
          message: data.message,
          type: 'error'
        });
      /*} else if (data.status === 401) {
        if (store.getters.token && store.getters.token === data.data) {
          const res = refreshToken(error);
          if (res !== error) {
            return res
          }
        } else {
          // Login
          router.push({ name: 'Login' })
        }
      } else if (data.status === 403) {
        // TODO handle 403 status error
      } else if (data.status === 404) {
        // TODO handle 404 status error
      } else if (data.status === 500) {
        // TODO handle 500 status error*/
      }

      if (!handled) {
        Message({
          showClose: true,
          message: data.message,
          type: 'error'
        });
      }
    } else {
      Message({
        showClose: true,
        message: '服务异常',
        type: 'error'
      });
    }
    return Promise.reject(error)
  }
);

function setTokenToHeader(config) {
  // set token
  const token = store.getters.token;
  Vue.$log.debug('Got token from store', token);
  if (token) {
    config.headers['Authorization'] = token
  }
}


async function reRequest(error) {
  const config = error.response.config;
  setTokenToHeader(config);
  const res = await axios.request(config);
  return res;
}



let refreshTask = null;

async function refreshToken(error) {
  const refreshToken = store.getters.token;
  try {
    if (refreshTask === null) {
      refreshTask = store.dispatch('refreshToken', refreshToken)
    }

    await refreshTask
  } catch (err) {
    if (err.response && err.response.data && err.response.data.data === refreshToken) {
      router.push({ name: 'Login' })
    }
    Vue.$log.error('Failed to refresh token', err)
  } finally {
    refreshTask = null
  }
  return reRequest(error)
}

export default service
