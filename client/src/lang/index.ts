import { createI18n } from "vue-i18n";
import en from "./en";
import zhCN from "./zh-CN";
import elementplusEn from "element-plus/lib/locale/lang/en";
import elementplusZhCN from "element-plus/lib/locale/lang/zh-cn";
import { useLangStoreHook } from "@/store/lang";
const store = useLangStoreHook();
console.log(111, store.locale);

const i18n = createI18n({
  legacy: false,
  locale: store.locale,
  globalInjection: true, // 挂载到全局
  messages: {
    "zh-CN": { ...zhCN, ...elementplusZhCN },
    en: { ...en, elementplusEn },
  },
});

export { i18n };
