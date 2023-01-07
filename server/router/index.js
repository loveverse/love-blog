const router = require("koa-router")();
const {
  hotword,
  person,
  issue,
  upload,
  user,
  wallpaper,
} = require("../controllers/index");
const { auth } = require("../middleware/index");
// 上传图片的模板
const multer = require("multer");
// 上传文件的位置
const static = multer({ dest: "./static/" });

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
router.post("/upload/file", static.any(), upload.uploadFile);
router.post("/wallpaper/findList", wallpaper.findPageWallpaper);
module.exports = router;
