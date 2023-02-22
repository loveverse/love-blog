import { ConfigEnv, UserConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
// 让api自动导入，如ref,reactive,watch,watchEffect等
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// 增强setup，可以将name写在script上
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  return {
    server: {
      host: command === "serve" ? "0.0.0.0" : "localhost",
      open: command === "build",
      port: 40001,
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
          // additionalData:
          //   "@use '@/assets/css/variables.scss' as *; @import '@/assets/css/base.scss';",
          // 全局引入后，不需要在其他文件引入
          additionalData: "@use '@/assets/css/base.scss' as *;",
        },
      },
    },
    // build: {
    //   // 打包时移除console.log、debugger和注释
    //   terserOptions: {
    //     compress: {
    //       drop_console: false,
    //       drop_debugger: true,
    //       pure_funcs: ["console.log"],
    //     },
    //     format: {
    //       comments: false, // 删除注释
    //     },
    //   },
    // },
  };
};
