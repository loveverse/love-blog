// vite.config.ts
import { resolve } from "path";
import vue from "file:///C:/Users/39809/Desktop/study/love-blog/client/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///C:/Users/39809/Desktop/study/love-blog/client/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/39809/Desktop/study/love-blog/client/node_modules/unplugin-vue-components/dist/vite.mjs";
import VueSetupExtend from "file:///C:/Users/39809/Desktop/study/love-blog/client/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import { ElementPlusResolver } from "file:///C:/Users/39809/Desktop/study/love-blog/client/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var __vite_injected_original_dirname = "C:\\Users\\39809\\Desktop\\study\\love-blog\\client";
var vite_config_default = ({ command, mode }) => {
  return {
    server: {
      host: command === "serve" ? "0.0.0.0" : "localhost",
      port: command === "serve" ? 40002 : 40001
    },
    plugins: [
      vue(),
      VueSetupExtend(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ["vue"]
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: "sass" })]
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/assets/css/base.scss' as *;`
        }
      }
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwzOTgwOVxcXFxEZXNrdG9wXFxcXHN0dWR5XFxcXGxvdmUtYmxvZ1xcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDM5ODA5XFxcXERlc2t0b3BcXFxcc3R1ZHlcXFxcbG92ZS1ibG9nXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvMzk4MDkvRGVza3RvcC9zdHVkeS9sb3ZlLWJsb2cvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgQ29uZmlnRW52LCBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG4vLyBcdThCQTlhcGlcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdUZGMENcdTU5ODJyZWYscmVhY3RpdmUsd2F0Y2gsd2F0Y2hFZmZlY3RcdTdCNDlcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcclxuLy8gXHU1ODlFXHU1RjNBc2V0dXBcdUZGMENcdTUzRUZcdTRFRTVcdTVDMDZuYW1lXHU1MTk5XHU1NzI4c2NyaXB0XHU0RTBBXHJcbmltcG9ydCBWdWVTZXR1cEV4dGVuZCBmcm9tIFwidml0ZS1wbHVnaW4tdnVlLXNldHVwLWV4dGVuZFwiO1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgKHsgY29tbWFuZCwgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6IGNvbW1hbmQgPT09IFwic2VydmVcIiA/IFwiMC4wLjAuMFwiIDogXCJsb2NhbGhvc3RcIixcclxuICAgICAgcG9ydDogY29tbWFuZCA9PT0gXCJzZXJ2ZVwiID8gNDAwMDIgOiA0MDAwMSxcclxuICAgICAgLy8gaG1yOiB7XHJcbiAgICAgIC8vICAgY2xpZW50UG9ydDogNDAwMDEsXHJcbiAgICAgIC8vIH0sXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgVnVlU2V0dXBFeHRlbmQoKSxcclxuICAgICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgICAgICBpbXBvcnRzOiBbXCJ2dWVcIl0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICAvLyBcdTVGQzVcdTk4N0JcdTUyQTBcdTRFMEFpbXBvcnRTdHlsZVx1RkYwQ1x1NEUwRFx1NzEzNlx1NjgzN1x1NUYwRlx1ODk4Nlx1NzZENlx1NTkzMVx1NjU0OFxyXG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoeyBpbXBvcnRTdHlsZTogXCJzYXNzXCIgfSldLFxyXG4gICAgICB9KSxcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgICAgIFwidnVlLWkxOG5cIjogXCJ2dWUtaTE4bi9kaXN0L3Z1ZS1pMThuLmNqcy5qc1wiLCAvLyBcdTk2OTBcdTg1Q0ZcdThCNjZcdTU0NEFcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvLyBcdTk1RUVcdTk4OThcdUZGMUFodHRwOi8vZXZlbnRzLmppYW5zaHUuaW8vcC80OTE4ZjhkOWYyYjRcclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgLy8gXHU1RjE1XHU1MTY1XHU1MTY4XHU1QzQwc2Nzc1xyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIC8vIFx1OEZEOVx1OTFDQ1x1NTIwNlx1NTNGN1x1NUZDNVx1OTg3Qlx1NEZERFx1NzU1OVxyXG4gICAgICAgICAgLy8gYWRkaXRpb25hbERhdGE6XHJcbiAgICAgICAgICAvLyAgIFwiQHVzZSAnQC9hc3NldHMvY3NzL3ZhcmlhYmxlcy5zY3NzJyBhcyAqOyBAaW1wb3J0ICdAL2Fzc2V0cy9jc3MvYmFzZS5zY3NzJztcIixcclxuICAgICAgICAgIC8vIFx1NTE2OFx1NUM0MFx1NUYxNVx1NTE2NVx1NTQwRVx1RkYwQ1x1NEUwRFx1OTcwMFx1ODk4MVx1NTcyOFx1NTE3Nlx1NEVENlx1NjU4N1x1NEVGNlx1NUYxNVx1NTE2NVxyXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAdXNlICdAL2Fzc2V0cy9jc3MvYmFzZS5zY3NzJyBhcyAqO2AsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvLyBidWlsZDoge1xyXG4gICAgLy8gICAvLyBcdTYyNTNcdTUzMDVcdTY1RjZcdTc5RkJcdTk2NjRjb25zb2xlLmxvZ1x1MzAwMWRlYnVnZ2VyXHU1NDhDXHU2Q0U4XHU5MUNBXHJcbiAgICAvLyAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgIC8vICAgICBjb21wcmVzczoge1xyXG4gICAgLy8gICAgICAgZHJvcF9jb25zb2xlOiBmYWxzZSxcclxuICAgIC8vICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXHJcbiAgICAvLyAgICAgICBwdXJlX2Z1bmNzOiBbXCJjb25zb2xlLmxvZ1wiXSxcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIGZvcm1hdDoge1xyXG4gICAgLy8gICAgICAgY29tbWVudHM6IGZhbHNlLCAvLyBcdTUyMjBcdTk2NjRcdTZDRThcdTkxQ0FcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICB9LFxyXG4gICAgLy8gfSxcclxuICB9O1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sU0FBUztBQUVoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUV2QixPQUFPLG9CQUFvQjtBQUMzQixTQUFTLDJCQUEyQjtBQVJwQyxJQUFNLG1DQUFtQztBQVd6QyxJQUFPLHNCQUFRLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBNkI7QUFDM0QsU0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ04sTUFBTSxZQUFZLFVBQVUsWUFBWTtBQUFBLE1BQ3hDLE1BQU0sWUFBWSxVQUFVLFFBQVE7QUFBQSxJQUl0QztBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsUUFDakMsU0FBUyxDQUFDLEtBQUs7QUFBQSxNQUNqQixDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFFVCxXQUFXLENBQUMsb0JBQW9CLEVBQUUsYUFBYSxPQUFPLENBQUMsQ0FBQztBQUFBLE1BQzFELENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLFFBQy9CLFlBQVk7QUFBQSxNQUNkO0FBQUEsSUFDRjtBQUFBLElBRUEsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFFbkIsTUFBTTtBQUFBLFVBS0osZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBY0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K