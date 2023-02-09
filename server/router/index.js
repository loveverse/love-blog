const router = require("koa-router")();
const {
  hotword,
  person,
  issue,
  common,
  user,
  wallpaper,
} = require("../controllers/index");
const { auth } = require("../middleware/index");

router.get("/", async (ctx) => {
  ctx.body = "欢迎访问该接口";
});
router.get("/wy/find", hotword.findHotword);
router.get("/wy/pageQuery", hotword.findPageHotword);

// 登录才能发表评论
router.get("/findExcerpt", person.findExcerpt);
router.get("/addExcerpt", auth, person.addExcerpt);
router.get("/updateExcerpt", auth, person.updateExcerpt);
router.get("/delExcerpt", auth, person.delExcerpt);

router.post("/findIssue", issue.findIssue);
router.post("/addIssue", issue.addIssue);

router.post("/register/user", user.register);
router.post("/upload/file", common.uploadFile);
// router.get("/download/file/:name", common.downloadFile);
router.post("/wallpaper/findList", wallpaper.findPageWallpaper);

module.exports = router;
