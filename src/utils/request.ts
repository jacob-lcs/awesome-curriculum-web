import { message } from 'antd';
import axios from 'axios';

// create an axios instance
const service = axios.create({
  baseURL: 'https://zhixiaogai.com', // url = base url + request url
  timeout: 5000, // request timeout
  withCredentials: true, // send cookies when cross-domain requests
});

// request interceptor
service.interceptors.request.use(
  (config: any) => {
    // do something before request is sent
    return config;
  },
  (error: any) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  /**
   * 如果你只想得到api返回的信息而不判断状态码
   * 请直接 return  response => response
   */

  /**
   * 拦截网络请求，根据状态码作出相应处理
   */
  (response: any) => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      message.error(res.message || 'Error');
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      // setToken(res.token)
      return res;
    }
  },
  (error: any) => {
    console.log('err' + error); // for debug
    message.error(error.message);
    return Promise.reject(error);
  },
);

export default service;
