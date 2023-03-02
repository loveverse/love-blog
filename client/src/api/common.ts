import { post } from "@/utils/http/index";
// 函数可传可不传
export const reqUpload = (params: any, callback?: Function) =>
  post("/upload/file", params, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 0,
    onUploadProgress: function (progressEvent) {
      // 处理原生进度事件
      callback && callback(progressEvent);
    },
  });
// 粘贴上传
export const reqPasteUpload = (params: any, callback?: Function) =>
  post("/paste/upload/file", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    timeout: 0,
    onUploadProgress: function (progressEvent) {
      // 处理原生进度事件
      callback && callback(progressEvent);
    },
  });

export const reqDownLoad = (params: any) => post("/download/file", params);
