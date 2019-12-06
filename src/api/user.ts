import request from '../utils/request';

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
  registerCode,
  register,
  login,
};
