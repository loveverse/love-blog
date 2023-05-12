import { post } from "@/utils/http/index";

export const reqUserInfo = (params: any) =>
  post("/wechat/find/userInfo", params);
export const reqAddUserInfo = (params: any) =>
  post("/wechat/add/userInfo", params);

export const reqAuditList = (params: any) =>
  post("/wechat/find/auditList", params);
export const reqUpdateAudit = (params: any) =>
  post("/wechat/update/audit", params);
