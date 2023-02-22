// 没写children，自动隐藏
export default [
  {
    icon: "",
    path: "/home/fileLib",
    title: "文件库",
    permiss: "0",
    children: [],
  },
  {
    icon: "",
    path: "/home/person",
    title: "聊天室",
    permiss: "1",
    children: [],
  },
  {
    icon: "",
    path: "/home/issue",
    title: "学习问题",
    permiss: "2",
    children: [],
  },

  {
    icon: "",
    path: "/classify",
    title: "分类",
    permiss: "4",
    children: [
      {
        icon: "",
        path: "/classify/plan",
        title: "考试计划",
        permiss: "3",
        children: [],
      },
      {
        icon: "",
        path: "/classify/wallpaper",
        title: "壁纸",
        permiss: "5",
        children: [],
      },
      {
        icon: "",
        path: "/classify/hotword",
        title: "网易热评",
        permiss: "4",
        children: [],
      },
    ],
  },
  {
    icon: "",
    path: "/about",
    title: "关于",
    permiss: "6",
    children: [],
  },
];
