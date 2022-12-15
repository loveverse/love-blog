import { get } from "@/utils/http/index";

interface IPageFind {
  limit: number;
  page: number;
}
// 网易云音乐热评API---------------------------------------
// 查询
export const reqFindData = () => get("/wy/find");
// 分页查询
export const reqPageFindData = (params: IPageFind) =>
  get("/wy/pageQuery", { params });
