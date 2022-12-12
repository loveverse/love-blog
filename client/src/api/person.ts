import { get } from "@/utils/http/index";

// 网易云音乐热评API---------------------------------------
// 查询
// export const reqFindData = () => get('/wy/find')
// // 分页查询
// export const reqPageFindData = (limit, page) => get('/wy/pageQuery', {limit,page})

// 书摘API---------------------------------------
export const reqFindExcerptData = () => get("/findExcerpt");
export const reqAddExcerptData = (params: any) =>
  get("/addExcerpt", { params });
export const reqUpdateExcerptData = (id: any, content: any) =>
  get("/updateExcerpt", { id, content });
export const reqDelExcerptData = (id: any) => get("/delExcerpt", { id });
