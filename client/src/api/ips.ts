import { post } from "@/utils/http/index";

export const reqIpList = (params: any) => post("/find/ipList", params);
