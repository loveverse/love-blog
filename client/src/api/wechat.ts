import { post } from "@/utils/http/index";

export const reqUserInfo = (params: any) =>
  post("/wechat/find/userInfo", params);
export const reqAddUserInfo = (params: any) =>
  post("/wechat/add/userInfo", params);
