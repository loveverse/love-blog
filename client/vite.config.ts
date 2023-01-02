import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
// 让api自动导入，如ref,reactive,watch,watchEffect等
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// 增强setup，可以将name写在script上
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // host: "0.0.0.0",
    open: true,
    // post: 40001, // 不生效，在package中配置
    // hmr: {
    //   clientPort: 40001,
    // },
  },
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue"],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  // 问题：http://events.jianshu.io/p/4918f8d9f2b4
  css: {
    preprocessorOptions: {
      // 引入全局scss
      scss: {
        // 这里分号必须保留
        additionalData: "@import '@/assets/css/base.scss';",
      },
    },
  },
});
