import request from '../utils/request';

const addCourse = (data: object) => {
  return request({
    url: '/api/course/addCourse',
    method: 'post',
    data,
  });
};

const deleteCourse = (data: object) => {
  return request({
    url: '/api/course/deleteCourse',
    method: 'post',
    data,
  });
};

const queryCourse = () => {
  return request({
    url: '/api/course/queryCourse',
    method: 'get',
  });
};

const updateCourse = (data: object) => {
  return request({
    url: '/api/course/updateCourse',
    method: 'post',
    data,
  });
};

const searchCourse = (data: object) => {
  return request({
    url: '/api/course/searchCourse',
    method: 'post',
    data,
  });
};

const getFavoriteCourse = (data: object) => {
  return request({
    url: '/api/course/favoriteCourse',
    method: 'post',
    data,
  });
};

const collectCourse = (data: object) => {
  return request({
    url: '/api/course/collectCourse',
    method: 'post',
    data,
  });
};

const deleteFavorite = (data: object) => {
  return request({
    url: '/api/course/deleteFavorite',
    method: 'post',
    data,
  });
};

export {
  addCourse,
  queryCourse,
  updateCourse,
  deleteCourse,
  searchCourse,
  collectCourse,
  deleteFavorite,
  getFavoriteCourse,
};
