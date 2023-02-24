import { post } from "@/utils/http/index";

export const reqUpload = (params: any) =>
  post("/upload/file", params, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  // 粘贴上传
export const reqPasteUpload = (params: any) =>
  post("/paste/upload/file", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

export const reqDownLoad = (params: any) => post("/download/file", params);
