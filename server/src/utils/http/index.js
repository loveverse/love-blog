const axios = require("axios");

const post = (url, data = {}, type = "POST") => {
  // data作为请求体发送的的数据只适用put,post,patch
  let promiseData;
  return new Promise((resolve) => {
    switch (type) {
      case "POST":
        promiseData = axios.post(url, data, config);
        break;
      case "PUT":
        promiseData = axios.put(url, data, config);
        break;
      case "PATCH":
        promiseData = axios.patch(url, data, config);
        break;
      default:
        break;
    }
    promiseData
      .then((result) => {
        resolve(result.data);
      })
      // 处理网络问题失败的请求，且不会继续向下执行
      .catch((error) => {
        console.error(error);
      });
  });
};
const get = (url, config = {}, type = "GET") => {
  let promise;
  return new Promise((resolve) => {
    switch (type) {
      case "GET":
        promise = axios.get(url, config);
        break;
      case "DELETE":
        promise = axios.delete(url, config);
        break;
      case "HEAD":
        promise = axios.head(url, config);
        break;
      case "OPTIONS":
        promise = axios.options(url, config);
        break;
      default:
        break;
    }
    promise
      .then((result) => resolve(result.data))
      // 处理失败的请求
      .catch((error) => {
        console.error(error);
      });
  });
};
module.exports = { get, post };
