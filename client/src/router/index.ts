import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const ComLayout = () => import("@/components/ComLayout/index.vue");
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/index.vue"),
    redirect: "/classify/visit",
    children: [
      {
        path: "/webRTC",
        name: "webRTC",
        component: () => import("@/views/webRTC/index.vue"),
      },
      {
        path: "/home",
        name: "home",
        component: ComLayout,
        redirect: "/404",
        children: [
          {
            path: "/home/fileLib",
            name: "fileLib",
            component: () => import("@/views/home/fileLib.vue"),
          },
          {
            path: "/home/person",
            name: "person",
            component: () => import("@/views/home/person.vue"),
          },
          {
            path: "/home/issue",
            name: "issue",
            component: () => import("@/views/home/issue.vue"),
          },
        ],
      },
      {
        path: "/classify",
        name: "classify",
        component: ComLayout,
        redirect: "/404",
        children: [
          {
            path: "/classify/plan",
            name: "plan",
            component: () => import("@/views/classify/plan/index.vue"),
          },
          {
            path: "/classify/hotword",
            name: "hotword",
            component: () => import("@/views/classify/hotword.vue"),
          },
          {
            path: "/classify/wallpaper",
            name: "wallpaper",
            component: () => import("@/views/classify/wallpaper.vue"),
          },
          {
            path: "/classify/visit",
            name: "visit",
            component: () => import("@/views/classify/visit.vue"),
          },
          {
            path: "/classify/wechat",
            name: "wechat",
            component: () => import("@/views/classify/wechat.vue"),
          },
          {
            path: "/classify/audit",
            name: "audit",
            component: () => import("@/views/classify/audit.vue"),
          },
        ],
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/views/about/index.vue"),
      },
    ],
  },
  {
    path: "/:path(.*)*",
    component: () => import("@/views/404.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return {
      el: "#main",
      top: 0,
    };
  },
});

// 不允许访问的路由
const whiteList = ["/classify/wechat", "/classify/audit"];
router.beforeEach(async (to, form, next) => {
  if (whiteList.includes(to.path)) {
    if (import.meta.env.DEV) {
      next();
    } else {
      next({ path: "/" });
    }
  } else {
    next();
  }
});
export default router;
