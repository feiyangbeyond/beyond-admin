import service from '../utils/service'

const baseUrl = '/api/admin/tag';

const tagApi = {};

tagApi.getAll = () => {
  return service({
    url: `${baseUrl}`,
    method: 'get'
  })
};

tagApi.addOne = (tag) => {
  return service({
    url: `${baseUrl}`,
    data: tag,
    method: 'post'
  })
};

tagApi.updateOne = (tag) => {
  return service({
    url: `${baseUrl}`,
    data: tag,
    method: 'put'
  })
};

tagApi.deleteOne = (id) => {
  return service({
    url:`${baseUrl}/${id}`,
    method: 'delete'
  })
};
export default tagApi
