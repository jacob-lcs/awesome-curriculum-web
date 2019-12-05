import request from '../utils/request';

const getUserInfo = (params: object) => {
  return request({
    method: 'get',
    url: '/api/user/getUserInfo',
    params,
  });
};

const registerCode = (data: object) => {
  return request({
    method: 'post',
    url: '/api/user/registerCode',
    data,
  });
};

const register = (data: object) => {
  return request({
    method: 'post',
    url: '/api/user/register',
    data,
  });
};

const login = (data: object) => {
  return request({
    method: 'post',
    url: '/api/user/login',
    data,
  });
};

export {
  getUserInfo,
  registerCode,
  register,
  login,
};
