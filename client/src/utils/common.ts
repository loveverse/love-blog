import moment from "moment";
import { Base64 } from "js-base64";
import { previewUrl } from "@/config/index";

export function formatterTime(timestamp: Date) {
  return moment(timestamp).format("YYYY-MM-DD HH:mm:ss");
}
// 检测是不是链接
export function urlify(text: string) {
  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return urlRegex.test(text);
}
// 预览服务
export function createPreviewUrl(url: string) {
  // url = decodeURI(url);
  return `${previewUrl}?url=${encodeURIComponent(Base64.encode(url))}`;
}

// 防止页面被debugger
export function check() {
  function doCheck(a: any) {
    if (("" + a / a)["length"] !== 1 || a % 20 === 0) {
      (function () {}["constructor"]("debugger")());
    } else {
      (function () {}["constructor"]("debugger")());
    }
    doCheck(++a);
  }
  try {
    doCheck(0);
  } catch (err) {}
}
