import service from '../utils/service'

const baseUrl = '/api/admin/log';

const logApi = {};

logApi.getLoginLog = (params) => {
  return service({
    url: `${baseUrl}/login`,
    params: params,
    method: `get`
  })
};
logApi.getSystemLog = (params) => {
  return service({
    url: `${baseUrl}/system`,
    params: params,
    method: `get`
  })
};

export default logApi
