export default {
  // ComHeader
  videoCall: "视频通话",
  fileLib: "文件库",
  chatRoom: "聊天室",
  studyIssue: "学习问题",
  classify: "分类",
  examPlan: "考试计划",
  wallpaper: "壁纸",
  netEaseHot: "网易热评",
  about: "关于",
  expansion: "展开",
  login: "登录",
  projectAddress: "项目地址",
  logOut: "退出登录",
  registerOrLogin: "注册/登录",
  userName: "用户名",
  password: "密码",
  register: "注册",

  // ComPreview
  filePreview: "文件预览",
  decodeIng: "正在解码中",
  fullScreen: "全屏",
  download: "下载",

  // status.ts
  requestError: "请求错误(400)",
  unauthorized: "未授权，请重新登录(401)",
  accessDenied: "拒绝访问(403)",
  requestError1: "请求出错(404)",
  requestTimeout: "请求超时(408)",
  serverError: "服务器错误(500)",
  serverNotRealize: "服务未实现(501)",
  networkError: "网络错误(502)",
  serverUnavailable: "服务不可用(503)",
  networkTimeout: "网络超时(504)",
  versionNonsupport: "HTTP版本不受支持(505)",
  connectionError: "连接出错，",
  checkNetwork: "请检查网络或联系管理员！",

  // websocket.ts
  connectClose: "连接已关闭，无法及时响应",
  browserNonsupport: "您的浏览器不支持WebSocket，无法获取数据",
  connectSuccess: "连接成功",
  connectClose1: "连接已关闭",
  connectFail: "连接失败，继续重连",

  // about
  projectIntroduction: "项目介绍",
  technologyStack: "技术栈",
  frontEnd: "前端",
  backEnd: "后端",
  deployment: "部署",
  technicalPoint: "技术点",
  fileLib1: "文件库：使用kkFileView预览服务，docker + nginx搭建。",
  chatRoom1:
    "聊天室：使用websocket，心跳检测，断线重连等；使用jsonwebtoken，颁发token，设置操作权限等；使用ETag（协商缓存）。",
  studyIssue1:
    "学习问题：上传组件，使用koa-body实现上传，开发和生产环境路径的配置。",
  wallpaper1:
    "壁纸：使用element-plus的骨架屏，图片懒加载，nginx下载，反向代理，文件访问权限，证书配置等。",
  timeNode: "时间节点",
  timeList: {
    content1: "增加文件预览服务",
    content2: "完善文件上传，优化壁纸加载速度",
    content3: "学习问题增加粘贴上传(1mb以内)",
    content4: "创建模块完成节点",
  },

  // hotword
  comeFrom: "--来自网易云音乐",
  jumpMusic: "点击歌名可跳转到对应歌曲",

  // wallpaper
  loadingFail: "加载失败",
  save: "保存",

  // fileLib
  uploadFile: "上传文件",
  number: "序号",
  fileName: "文件名",
  size: "大小",
  operation: "操作",
  delete: "删除",
  uploadNotice: "上传须知",
  noticeList: {
    content1:
      "登录用户可以创建属于自己的单独空间，非本账号无法查看，删除文件。",
    content2: "上传文件最大为512MB(不推荐大文件)；粘贴上传文件请勿超过1MB！",
    content3: "上传大文件时，等待时间略长！",
  },
  uploadTip: "选择文件 或 粘贴截图",
  message: {
    uploadSuccess: "上传成功",
    fileDelSuccess: "文件删除成功",
    delSuccess: "删除成功",
    editSuccess: "编辑成功",
    saveSuccess: "保存成功",
    notContentWarn: "输入的内容不能为空！",
    releaseSuccess: "内容发布成功！",
    updateSuccess: "内容修改成功！",
    delSuccess1: "内容删除成功！",
    disconnetWarn: "连接断开，消息不再即时推送！",
    logOutSuccess: "退出成功",
  },
  messageBox: {
    tip: "确定删除文件该文件吗?",
    title: "删除文件",
    confirm: "确定",
    cancel: "取消",
  },

  // issue
  createIssue: "新增问题",
  time: "时间",
  issueTitle: "问题标题",
  link: "链接",
  issueImg: "问题图片",
  edit: "编辑",
  delIssue: "是否删除该问题？",
  title: "标题",
  img: "图片",
  place: {
    title: "请输入标题",
    link: "请输入链接",
    content: "请输入内容",
    author: "请输入作者",
    userName: "请输入用户名",
    password: "请输入密码",
  },
  cancel: "取消",
  confirm: "确定",
  rule: {
    title: "标题不能为空",
    link: "链接不能为空",
    userName: "用户名不能为空",
    password: "密码不能为空",
  },
  
  // person
  editIssue: "编辑问题",
  comeFrom1: "--来自“",
  total: "共",
  article: "篇",
  connected: "已连接",
  closed: "已关闭，请刷新",
  submit: "提交",
  closeConnect: "关闭连接",

  // 404
  notExit: "啊哦~ 你所访问的页面不存在",
  backHome: "返回首页",
};
