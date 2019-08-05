import service from '../utils/service'

const baseUrl = '/api/admin/category';

const categoryApi = {};

categoryApi.getAll = () => {
  return service({
    url: `${baseUrl}`,
    method: 'get'
  })
};

categoryApi.addOne = (category) => {
  return service({
    url: `${baseUrl}`,
    data: category,
    method: 'post'
  })
};

categoryApi.updateOne = (category) => {
  return service({
    url: `${baseUrl}`,
    data: category,
    method: 'put'
  })
};
categoryApi.deleteOne = (id) => {
  return service({
    url: `${baseUrl}/${id}`,
    method: 'delete'
  })
};

export default categoryApi
