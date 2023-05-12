import { defineStore } from "pinia";
import store from "./index";
export const useLangStore = defineStore("lang", {
  state: () => {
    return {
      locale: localStorage.getItem("lang") || "zh-CN",
    };
  },
  actions: {
    updateLocale(val: string) {
      this.locale = val;
      console.log("[ this.locale ] >", this.locale);
    },
  },
});
// 单独导出
export function useLangStoreHook() {
  return useLangStore(store);
}
