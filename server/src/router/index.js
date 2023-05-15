const router = require("koa-router")();
const {
  hotword,
  person,
  issue,
  common,
  user,
  wallpaper,
  fileList,
  wechat,
  ips,
  audit,
} = require("../controllers/index");
const { auth } = require("../middleware/index");

// router.get("/", async (ctx) => {
//   ctx.body = "欢迎访问该接口";
// });
router.get("/wy/find", hotword.findHotword);
router.get("/wy/pageQuery", hotword.findPageHotword);

// 登录才能删除，修改评论（协商缓存）
router.get("/findExcerpt", person.findExcerpt);
router.get("/addExcerpt", person.addExcerpt);
router.get("/updateExcerpt", auth, person.updateExcerpt);
router.get("/delExcerpt", auth, person.delExcerpt);

// 不走缓存
router.post("/findIssue", issue.findIssue);
router.post("/addIssue", issue.addIssue);
router.post("/delIssue", issue.delIssue);
router.post("/editIssue", issue.editIssue);

router.post("/register/user", user.register);
router.post("/upload/file", common.uploadFile);
router.post("/paste/upload/file", common.pasteUploadFile);
// router.get("/download/file/:name", common.downloadFile);
// 强缓存
router.get("/wallpaper/findList", wallpaper.findPageWallpaper);

// 文件列表
router.post("/file/list", auth, fileList.findFileLsit);
router.post("/save/list", auth, fileList.saveFileInfo);
router.post("/delete/file", auth, fileList.delFile);

// 微信验证
router.post("/wechat", wechat.verifyWechat);
router.get("/wechat", wechat.verifyWechat);
// 查询
router.post("/wechat/find/userInfo", wechat.findUserInfo);
router.post("/wechat/add/userInfo", wechat.addUserInfo);
router.post("/wechat/find/one/userInfo", wechat.findOneUserInfo);
router.post("/wechat/delete/user", wechat.deleteUser);
router.post("/wechat/edit/user", wechat.editUserInfo);

// 审核
router.post("/wechat/find/auditList", audit.findAuditPage);
router.post("/wechat/update/audit", audit.updateAudit);
router.post("/wechat/delete/audit", audit.deleteAudit);

// ip
router.post("/find/ipList", (ctx, next) => ips.findIpsList(ctx, next));
module.exports = router;
