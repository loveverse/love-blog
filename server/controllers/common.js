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
      const { file } = ctx.request.files;
      console.log(file);
      // // 创建可读流
      const reader = fs.createReadStream(file.filepath);
      let filePath =
        path.join(__dirname, "../static") + `/${file.originalFilename}`;
      // // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // // 可读流通过管道写入可写流
      reader.pipe(upStream);
      const fileInfo = {
        id: 0,
        url: file.filepath,
        name: file.originalFilename,
      };
      ctx.body = response.SUCCESS("common", fileInfo);
    } catch (error) {
      console.log(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
}

module.exports = new Common();
