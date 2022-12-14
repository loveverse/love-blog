const router = require("koa-router")();
const { hotword, person, issue, upload } = require("../controllers/index");

// 上传图片的模板
const multer = require("multer");
// 上传文件的位置
const static = multer({ dest: "../static/" });

router.post("/upload/file", static.any(), upload.uploadFile);
router.get("/wy/find", hotword.findHotword);
router.get("/wy/pageQuery", hotword.findPageHotword);

router.get("/findExcerpt", person.findExcerpt);
router.get("/addExcerpt", person.addExcerpt);
router.get("/updateExcerpt", person.updateExcerpt);
router.get("/delExcerpt", person.delExcerpt);

router.post("/findIssue", issue.findIssue);
router.post("/addIssue", issue.addIssue);

module.exports = router;
