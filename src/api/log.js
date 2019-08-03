import service from '../utils/service'

const baseUrl = '/api/admin/log';

const logApi = {};

logApi.getLoginLog = (pageNum, pageSize) => {
  return service({
    url: `${baseUrl}/login`,
    data: {
      pageNum: pageNum,
      pageSize: pageSize
    },
    method: `get`
  })
};
logApi.getSystemLog = (pageNum, pageSize) => {
  return service({
    url: `${baseUrl}/system`,
    data: {
      pageNum: pageNum,
      pageSize: pageSize
    },
    method: `get`
  })
};

export default logApi
