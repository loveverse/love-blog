import { post } from "@/utils/http/index";

export const reqUserInfo = (params: any) =>
  post("/wechat/find/userInfo", params);
export const reqAddUserInfo = (params: any) =>
  post("/wechat/add/userInfo", params);

// 查询单个uid
export const reqFindOneUserInfo = (params: any) =>
  post("/wechat/find/one/userInfo", params);
// 删除用户
export const reqDeleteUser = (params: any) =>
  post("/wechat/delete/user", params);
// 编辑用户
export const reqEditUser = (params: any) => post("/wechat/edit/user", params);
export const reqMaxUser = (params: any) => post("/wechat/max/user", params);

// 审核
export const reqAuditList = (params: any) =>
  post("/wechat/find/auditList", params);
export const reqUpdateAudit = (params: any) =>
  post("/wechat/update/audit", params);
export const reqDeleteAudit = (params: any) =>
  post("/wechat/delete/audit", params);