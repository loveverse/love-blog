import { post } from "@/utils/http/index";

interface IAddUser {
  userName: string;
  password: string;
}
export const reqRegisterUser = (params: IAddUser) =>
  post("/register/user", params);
