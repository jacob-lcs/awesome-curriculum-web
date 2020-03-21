import request from '../utils/request';

const queryHistoryMessage = (data: object) => {
  return request({
    url: '/api/message/queryHistoryMessage',
    method: 'post',
    data,
  });
};

export {
  queryHistoryMessage,
};
