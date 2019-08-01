import axios from 'axios'
import router from 'router'
import store from 'store'

axios.defaults.withCredentials = true;

const setUserInfo = function (token) {
  store.commit("Authorization", token)
};

const getUserInfo = function () {
  return store.status.authorization.token
};
