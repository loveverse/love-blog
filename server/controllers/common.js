const os = require("os");
const fs = require("fs");
const path = require("path");
const send = require("koa-send");
const response = require("../utils/resData");
const { NETWORK_PATH, FILE_PATH } = require("../config/index");

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
      // // 创建可读流
      const reader = fs.createReadStream(file.filepath);
      // 检查文件夹是否存在，不存在则创建文件夹
      if (!fs.existsSync(FILE_PATH)) {
        FILE_PATH && fs.mkdirSync(FILE_PATH);
      }
      // 上传的文件具体地址
      let filePath = path.join(
        FILE_PATH || __dirname,
        `${FILE_PATH ? "./" : "../static/"}${file.originalFilename}`
      );
      // // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // // 可读流通过管道写入可写流
      reader.pipe(upStream);
      const fileInfo = {
        id: Date.now(),
        url: NETWORK_PATH + filePath,
        name: file.originalFilename,
      };
      ctx.body = response.SUCCESS("common", fileInfo);
    } catch (error) {
      console.log(error);
      ctx.body = response.ERROR("upload");
    }
  }
}

module.exports = new Common();
