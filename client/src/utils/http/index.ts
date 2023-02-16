import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { showMessage } from "./status";
import { domain } from "@/config/index";

// 进行类型覆盖
interface RequestConfig extends AxiosRequestConfig {
  headers?: any;
}
interface IResponse<T = any> {
  code: number | string;
  data?: T;
  msg: string;
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
  (error) => {
    console.log("[ error ] >", error);
    // 错误响应信息
    if (error && error.response) {
      return Promise.reject(showMessage(error.response.status));
    }
    return Promise.reject(showMessage(""));
  }
);

export function post<T = any>(
  url: string,
  data: object = {},
  config: AxiosRequestConfig = {},
  type: string = "POST"
): Promise<T> {
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
        const data: IResponse = result.data;
        resolve(data as T);
      })
      // 处理网络问题失败的请求，且不会继续向下执行
      .catch((error) => {
        // 错误会从上面传递下来
        ElMessage.error(error);
      });
  });
}
// 返回一个promise类型
export function get<T = any>(
  url: string,
  data: object = {},
  config: AxiosRequestConfig = {},
  type: string = "GET"
): Promise<T> {
  let promise: Promise<AxiosResponse<any, any>>;
  return new Promise((resolve) => {
    switch (type) {
      case "GET":
        promise = http.get(url, { params: data, ...config });
        break;
      case "DELETE":
        promise = http.delete(url, config);
        break;
      case "HEAD":
        promise = http.head(url, { params: data, ...config });
        break;
      case "OPTIONS":
        promise = http.options(url, { params: data, ...config });
        break;
      default:
        break;
    }
    promise
      .then((result: AxiosResponse) => {
        // const { data } = result;
        // 服务器错误会返回
        const data: IResponse = result.data;
        resolve(data as T);
      })
      // 处理失败的请求
      .catch((error) => {
        // 自己接口api写错会执行
        ElMessage.error(error);
      });
  });
}
