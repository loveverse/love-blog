import { createApp } from "vue";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import router from "@/router";
import { check } from "@/utils/common";
import "@/assets/css/index.scss";
// 暗黑主题
import 'element-plus/theme-chalk/dark/css-vars.css'

// 弹窗不显示，需要手动引入样式,参考：https://github.com/element-plus/element-plus/issues/5108（官方文档也有说明）
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/notification/style/css";

// 生产环境时防止debugger
if (!import.meta.env.DEV) {
  check();
}

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 全局引入
// app.config.globalProperties.$message = ElMessage;

app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});

app.directive("focus", {
  mounted: function (el: any) {
    if (el.tagName == "INPUT") {
      el.focus();
    } else if (el.tagName === "TEXTEA") {
    } else {
      el.querySelector("input") && el.querySelector("input").focus();
    }
  },
  updated: function (el: any, binding: any, vnode: any) {
    if (el.tagName == "INPUT") {
      el.focus();
    } else {
      // // inserted是插入到dom时才会触发，上面使用v-show只是隐藏，不会触发指令中的函数
      // vnode.context.nextTick(() => {
      el.querySelector("input") && el.querySelector("input").focus();
      // });
    }
  },
});
app.mount("#app");
