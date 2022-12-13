import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { showMessage } from "./status";
import { domain } from "@/config/index";
// 进行类型覆盖
interface RequestConfig extends AxiosRequestConfig {
  headers?: any;
}
const http: AxiosInstance = axios.create({
  baseURL: domain,
  timeout: 50000, // 超时时间
  withCredentials: false, // 表示跨域请求时是否需要使用凭证
});

http.interceptors.request.use((config: RequestConfig) => {
  if (localStorage.getItem("token")) {
    config.headers["LOVE-TOKEN"] = localStorage.getItem("token");
  }
  return config;
});
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    // 错误响应信息
    if (error && error.response) {
      return Promise.reject(showMessage(error.response.status));
    }
    return Promise.reject(showMessage(""));
  }
);

export function post(url: string, data = {}, config = {}, type = "POST") {
  //是否进入我教的课班级详情

  //判断类型是否要转
  // switch (headers) {
  //   case "urlencoded":
  //     config.headers = { "Content-Type": "application/x-www-form-urlencoded" };
  //     data = qs.stringify(data);
  //     break;
  //   case "formData" || "exe":
  //     config.headers = { "Content-Type": "multipart/form-data" };
  //     break;
  //   case "postBolb":
  //     config.responseType = "blob";
  //     break;
  //   case "formBolb":
  //     config.headers = { "Content-Type": "application/x-www-form-urlencoded" };
  //     data = qs.stringify(data);
  //     config.responseType = "blob";
  //     break;
  //   default:
  //     config = headers;
  //     break;
  // }
  // data作为请求体发送的的数据只适用put,post,patch
  let promiseData: Promise<AxiosResponse<any, any>>;
  return new Promise((resolve) => {
    switch (type) {
      case "POST":
        promiseData = http.post(url, data, config);
        break;
      case "PUT":
        promiseData = http.put(url, data, config);
        break;
      case "PATCH":
        promiseData = http.patch(url, data, config);
        break;
      default:
        break;
    }
    promiseData
      .then((result: AxiosResponse) => {
        resolve(result.data);
      })
      // 处理网络问题失败的请求，且不会继续向下执行
      .catch((error: any) => {
        // 错误会从上面传递下来
        // Message.error(error);
      });
  });
}
export function get(url: string, config = {}, type = "GET") {
  let promise: Promise<AxiosResponse<any, any>>;
  return new Promise((resolve) => {
    switch (type) {
      case "GET":
        promise = http.get(url, config);
        break;
      case "DELETE":
        promise = http.delete(url, config);
        break;
      case "HEAD":
        promise = http.head(url, config);
        break;
      case "OPTIONS":
        promise = http.options(url, config);
        break;
      default:
        break;
    }
    promise
      .then((result: AxiosResponse) => resolve(result.data))
      // 处理失败的请求
      .catch((error: any) => {
        // Message.error(error);
      });
  });
}
