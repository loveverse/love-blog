const os = require("os");
const fs = require("fs");
const { SUCESS_RES, ERROR_UPLOAD } = require("../utils/resData");

function uploadFile(req, res) {
  try {
    console.log(req.files, res, 111);
    // fs.readFile(req.file.path, (err, data) => {
    if (err) {
      res.send(ERROR_UPLOAD.getCode(null));
      return;
    }
    // let oldName = req.files.path; // 上传后默认的文件名 : 15daede910f2695c1352dccbb5c3e897
    // let newName = "upload/" + req.files.originalname; // 指定文件路径和文件名
    // // 3. 将上传后的文件重命名
    // fs.renameSync(oldName, newName);
    // const obj = {
    //   name: oldName,
    //   url: "",
    //   id: new Date(),
    // };
    res.send(SUCESS_RES.getCode({}));
    // });
  } catch (error) {}
}
module.exports = {
  uploadFile,
};
