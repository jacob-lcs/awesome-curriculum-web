import request from '../utils/request';

const addCourse = (data: object) => {
  return request({
    url: '/api/course/addCourse',
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

export {
  addCourse,
  queryCourse,
  updateCourse,
};
