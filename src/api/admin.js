import service from '../utils/service'

const baseUrl = '/api/admin';

const adminApi = {};

//获取博客运行信息
adminApi.info = () => {
  return service({
    url: `${baseUrl}/info`,
    method: `get`,
    mute: true
  })
};

//登录
adminApi.login = (username, password) => {
  return service({
    url: `${baseUrl}/login`,
    data: {
      username: username,
      password: password
    },
    method: 'post'
  })
};

//登出
adminApi.logout = () => {
  return service({
    url: `${baseUrl}/logout`,
    method: 'post'
  })
};

//获取博客设置
adminApi.setting = () => {
  return service({
    url: `${baseUrl}/setting`,
    method: `get`
  })
};

export default adminApi
