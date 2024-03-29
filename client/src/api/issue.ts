import { post } from "@/utils/http/index";

interface IAddIssue {
  title: string | number;
  link: string;
  status?: number;
  file?: object;
}
export const reqIssueList = () => post("/findIssue");
export const reqAddIssue = (params: IAddIssue) => post("/addIssue", params);
export const reqDelIssue = (params: any) => post("/delIssue", params);
export const reqEditIssue = (params: any) => post("/editIssue", params);
