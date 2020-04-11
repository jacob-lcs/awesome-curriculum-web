import request from '../utils/request';

const queryHistoryMessage = (data: object) => {
  return request({
    url: '/api/message/queryHistoryMessage',
    method: 'post',
    data,
  });
};

const checkMessageSendByMyself = (data: object) => {
  return request({
    url: '/api/message/checkMessageSendByMyself',
    method: 'post',
    data,
  });
};

export {
  queryHistoryMessage,
  checkMessageSendByMyself,
};
