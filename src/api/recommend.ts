import request from '../utils/request';

export function queryLabel() {
  return request({
    url: '/api/recommend/queryLabel',
    method: 'get',
  });
}

export function submitUserLabel(data: any) {
  return request({
    url: '/api/recommend/submitUserLabel',
    method: 'post',
    data,
  });
}
