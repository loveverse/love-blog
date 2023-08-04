import { createApp } from "vue";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import router from "@/router";
import { check } from "@/utils/common";
import "@/assets/css/index.scss";
// 暗黑主题
import "element-plus/theme-chalk/dark/css-vars.css";
import { i18n } from "@/lang";
import store from "@/store/index";
import directive from "@/utils/directive";

// 弹窗不显示，需要手动引入样式,参考：https://github.com/element-plus/element-plus/issues/5108（官方文档也有说明）
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/notification/style/css";

// import components from "@/components/index";
// 生产环境时防止debugger
if (!import.meta.env.DEV) {
  check();
}

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 注册全局组件
// for (const component in components) {
//   app.component(component, components[component]);
// }
// 全局引入
// app.config.globalProperties.$message = ElMessage;

app.use(i18n);
app.use(router);
app.use(store);
app.use(ElementPlus);
// 自定义指令
app.use(directive)
app.mount("#app");
