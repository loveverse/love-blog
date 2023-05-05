import { post } from "@/utils/http/index";

export const reqRegisterUser = (params: any) =>
  post("/wechat/find/userInfo", params);
