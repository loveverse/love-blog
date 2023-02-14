import { get } from "@/utils/http/index";

interface IPageFind {
  limit: number;
  page: number;
}

// 分页查询
export const reqImgList = (params: IPageFind) =>
  get("/wallpaper/findList", params);
