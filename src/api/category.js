import service from '../utils/service'

const baseUrl = '/api/admin/category';

const categoryApi = {};

categoryApi.getAll = () => {
  return service({
    url: `${baseUrl}`,
    method: 'get'
  })
};

categoryApi.add = () => {
  return service({

  })
};

export default categoryApi
