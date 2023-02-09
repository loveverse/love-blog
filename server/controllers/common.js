const os = require("os");
const fs = require("fs");
const path = require("path");
const send = require("koa-send");
const response = require("../utils/resData");

class Common {
  constructor() {}
  async downloadFile(ctx, next) {
    try {
      // console.log(ctx);
      // const { url } = ctx.request;
      // console.log(url);
      // // // 提取文件名
      // const name =
      //   "https://note.loveverse.top/imgs" + url.substring(url.lastIndexOf("/"));
      // console.log(name);
      // // // const name = ctx.params.name;
      // // const path = `https://note.loveverse.top/imgs/${name}`;
      // // ctx.attachment("/app.js");
      // ctx.set("Content-Type", "application/x-download");
      // // await send(ctx, "");
      // console.log(__dirname);
      // const rs = fs.createReadStream(__dirname + "/" + name);
      // response.writeHead(200, {
      //   "Content-Type": "application/force-download",
      //   "Content-Disposition": "attachment; filename=" + name,
      // });
      // rs.pipe(response);
      // const filepath = path.resolve(__dirname, url);
      // console.log(filepath);
      // ctx.attachment(url);
      
      // ctx.s
      // ctx.body = fs.createReadStream(filepath);
    } catch (error) {
      console.log(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
  async uploadFile(ctx, next) {
    try {
      console.log(req, res, 111);
      // fs.readFile(req.file.path, (err, data) => {
      if (err) {
        res.send(response.ERROR("uploadFileNotNull"));
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
      res.send(response.SUCCESS("common", {}));
      // });
    } catch (error) {}
  }
}

module.exports = new Common();
