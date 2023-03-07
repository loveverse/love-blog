import { post } from "@/utils/http/index";

// 查询文件列表
export const reqFileList = () => post("/file/list");
// 保存文件信息
export const reqSaveFile = (params: any) => post("/save/list", params);
// 删除文件
export const reqDelFile = (params: any) => post("/delete/file", params);
