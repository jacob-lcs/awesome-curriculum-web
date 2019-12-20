import request from '../utils/request';

export function uploadFile(data: FormData) {
  return request({
    url: '/api/file/uploadFile',
    method: 'post',
    data,
  });
}
