import { post } from "@/utils/http/index";

// 查询文件列表
export const reqFileList = () => post("/file/list");
