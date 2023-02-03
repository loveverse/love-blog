import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const ComLayout = () => import("@/components/ComLayout/index.vue");
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/index.vue"),
    redirect: "/home/person",
    children: [
      {
        path: "/home",
        name: "home",
        component: ComLayout,
        redirect: "/404",
        children: [
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
        ],
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
});

export default router;
