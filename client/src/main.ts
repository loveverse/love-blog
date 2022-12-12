import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/index.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import router from "@/router";


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount("#app");
