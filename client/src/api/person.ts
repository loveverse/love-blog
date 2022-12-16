import { get } from "@/utils/http/index";

// 网易云音乐热评API---------------------------------------
// 查询
// export const reqFindData = () => get('/wy/find')
// // 分页查询
// export const reqPageFindData = (limit, page) => get('/wy/pageQuery', {limit,page})

// 书摘API---------------------------------------
interface IUpdExcerpt {
  id: number;
  content: string;
}
interface IDelExcerpt {
  id: number;
}
interface IAddExcerpt {
  content: string;
  author: string;
  flag: number;
  date: Date;
}
export const reqFindExcerptData = () => get("/findExcerpt");
export const reqAddExcerptData = (params: IAddExcerpt) =>
  get("/addExcerpt", params);
export const reqUpdateExcerptData = (params: IUpdExcerpt) =>
  get("/updateExcerpt", params);
export const reqDelExcerptData = (params: IDelExcerpt) =>
  get("/delExcerpt", params);
