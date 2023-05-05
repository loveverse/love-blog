import { t } from "@/lang";

// 没写children，自动隐藏
export default [
  {
    icon: "",
    path: "/webRTC",
    name: "webRTC",
    title: t("videoCall"),
    permiss: "-1",
    children: [],
  },
  {
    icon: "",
    path: "/home/fileLib",
    title: t("fileLib"),
    permiss: "0",
    children: [],
  },
  {
    icon: "",
    path: "/home/person",
    title: t("chatRoom"),
    permiss: "1",
    children: [],
  },
  {
    icon: "",
    path: "/home/issue",
    title: t("studyIssue"),
    permiss: "2",
    children: [],
  },

  {
    icon: "",
    path: "/classify",
    title: t("classify"),
    permiss: "4",
    children: [
      {
        icon: "",
        path: "/classify/plan",
        title: t("examPlan"),
        permiss: "3",
        children: [],
      },
      {
        icon: "",
        path: "/classify/wallpaper",
        title: t("wallpaper"),
        permiss: "5",
        children: [],
      },
      {
        icon: "",
        path: "/classify/hotword",
        title: t("netEaseHot"),
        permiss: "4",
        children: [],
      },
      {
        icon: "",
        path: "/classify/visit",
        title: "到访记录",
        permiss: "10",
        children: [],
      },
      {
        icon: "",
        path: "/classify/wechat",
        title: "查询",
        permiss: "10",
        children: [],
      },
    ],
  },
  {
    icon: "",
    path: "/about",
    title: t("about"),
    permiss: "6",
    children: [],
  },
];
