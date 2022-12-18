import { post } from "@/utils/http/index";

export const reqUpload = (params: any) =>
  post("/upload/file", params, {
    headers: { "Content-Type": "multipart/form-data" },
    responseType: "blob",
  });
