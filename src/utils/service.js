import axios from 'axios'
import Vue from 'vue'
import store from '../store'

//封装axios
const service = axios.create({
  baseURL: `http://localhost:8080`,
  timeout: 5000,
  withCredentials: true
});

//请求拦截器
service.interceptors.request.use(
  config => {
    // config.baseURL = store.getters.apiUrl;
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
  response =>{
    return response;
  },
  error => {
    if (axios.isCancel(error)) {
      Vue.$log.debug('Cancelled uploading by user.');
      return Promise.reject(error)
    }

    Vue.$log.error('Response failed', error);

    const response = error.response;
    const status = response ? response.status : -1;
    Vue.$log.error('Server response status', status);

    const data = response ? response.data : null;
    if (data) {
      let handled = false;
      // Business response
      Vue.$log.error('Business response status', data.status);
      if (data.status === 400) {
        // TODO handle 400 status error
      } else if (data.status === 401) {
        // TODO handle 401 status error
      } else if (data.status === 403) {
        // TODO handle 403 status error
      } else if (data.status === 404) {
        // TODO handle 404 status error
      } else if (data.status === 500) {
        // TODO handle 500 status error
      }

      if (!handled) {
        this.$message.error(data.message)
      }
    } else {
      this.$message.error('服务异常')
    }

    return Promise.reject(error)
  }
);

function setTokenToHeader(config) {
  // set token
  const token = store.getters.token;
  Vue.$log.debug('Got token from store', token);
  if (token && token.access_token) {
    config.headers['Authorization'] = token.access_token
  }
}


async function reRequest(error) {
  const config = error.response.config;
  setTokenToHeader(config);
  const res = await axios.request(config);
  return res;
}


export default service
