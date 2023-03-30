export default {
  // ComHeader
  videoCall: "Video call",
  fileLib: "File Library",
  chatRoom: "chat room",
  studyIssue: "Learning problems",
  classify: "classify",
  examPlan: "Examination plan",
  wallpaper: "wallpaper",
  netEaseHot: "NetEase Hot Review",
  about: "about",

  // ComPreview
  filePreview: "File preview",
  decodeIng: "Decoding",
  fullScreen: "Full screen",
  download: "download",

  // status.ts
  requestError: "Request error(400)",
  unauthorized: "Unauthorized, please log in again(401)",
  accessDenied: "access denied(403)",
  requestError1: "Request error(404)",
  requestTimeout: "request timeout(408)",
  serverError: "Server error(500)",
  serverNotRealize: "Service not implemented(501)",
  networkError: "network error(502)",
  serverUnavailable: "Service unavailable(503)",
  networkTimeout: "Network Timeout(504)",
  versionNonsupport: "HTTP version is not supported(505)",
  connectionError: "link error，",
  checkNetwork: "Please check the network or contact the administrator！",

  // websocket.ts
  connectClose: "The connection is closed and cannot respond in time",
  browserNonsupport:
    "Your browser does not support WebSocket and cannot get data",
  connectSuccess: "Successful connection",
  connectClose1: "Connection closed",
  connectFail: "Connection failed, continue to reconnect",

  // about
  projectIntroduction: "Project introduction",
  technologyStack: "Technology stack",
  frontEnd: "Front end",
  backEnd: "Back end",
  deployment: "deployment",
  technicalPoint: "Technical point",
  fileLib1:
    "File library: Use kkFileView preview service and docker + nginx to build.",
  chatRoom1:
    "Chat room: using websocket, heartbeat detection, disconnection, etc.; Using jsonwebtoken, issuing tokens, setting operation permissions, etc. Use ETag (negotiated cache)",
  studyIssue1:
    "Learning issues: Upload components, use koa-body to implement upload, development and production environment path configuration.",
  wallpaper1:
    "Wallpaper: Skeleton screen using element-plus, lazy image loading, nginx downloads, reverse proxies, file access, certificate configuration, etc.",
  timeNode: "Time node",
  timeList: {
    content1: "Add file preview service",
    content2: "Improve file upload, optimize the wallpaper loading speed",
    content3: "Learning Problems Added Paste Upload (within 1mb)",
    content4: "Create a module to complete the node",
  },

  // hotword
  comeFrom: "--From NetEase cloud music",
  jumpMusic: "Click the name of the song to go to the corresponding song",

  // wallpaper
  loadingFail: "Load failure",
  save: "save",

  // fileLib
  uploadFile: "Upload file",
  number: "number",
  fileName: "File name",
  size: "size",
  operation: "operation",
  delete: "delete",
  uploadNotice: "Upload instructions",
  noticeList: {
    content1:
      "Logged-in users can create their own separate space, other than this account cannot view, delete files.",
    content2:
      "The maximum size of a file to be uploaded is 512MB(large files are not recommended). Paste upload file do not exceed 1MB!",
    content3: "When uploading large files, the wait time is slightly longer!",
  },
  uploadTip: "Select File or paste screenshot",
  message: {
    uploadSuccess: "Upload successfully",
    fileDelSuccess: "File deletion succeeded",
    delSuccess: "Deleted successfully",
    editSuccess: "Edit successfully",
    saveSuccess: "Save successfully",
    notContentWarn: "The input cannot be empty!",
    releaseSuccess: "Content release success!",
    updateSuccess: "Content modified successfully!",
    delSuccess1: "Content deleted successfully!",
    disconnetWarn:
      "The connection is disconnected, the message is no longer instant push!",
  },
  messageBox: {
    tip: "Are you sure to delete the file?",
    title: "Delete file",
    confirm: "determine",
    cancel: "cancel",
  },

  // issue
  createIssue: "New problem",
  time: "time",
  issueTitle: "Question heading",
  link: "link",
  issueImg: "Problem picture",
  edit: "edit",
  img: "picture",
  delIssue: "Do you want to delete the problem?",
  title: "title",
  place: {
    title: "Please enter the title",
    link: "Please enter the link",
    content: "Please enter the content",
    author: "Please enter author",
  },
  cancel: "cancel",
  confirm: "determine",
  rule: {
    title: "The title cannot be empty",
    link: "Links cannot be empty",
  },

  // person
  editIssue: "Editing problem",
  comeFrom1: "--Come from“",
  total: "A total of",
  article: "article",
  connected: "connected",
  closed: "Closed, please refresh",
  submit: "submit",
  closeConnect: "Close connection",

  // 404
  notExit: "Uh-oh ~ The page you visited does not exist",
  backHome: "Return to home page",
};
