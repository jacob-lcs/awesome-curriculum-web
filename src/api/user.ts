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

const logout = () => {
  return request({
    method: 'get',
    url: '/api/user/logout',
  });
};

const updateName = (data: object) => {
  return request({
    method: 'post',
    url: '/api/user/updateName',
    data,
  });
};

export {
  registerCode,
  register,
  login,
  logout,
  updateName,
};
