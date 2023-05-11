const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const response = require("../utils/resData");
const { APP_NETWORK_PATH, APP_FILE_PATH } = require("../config/index");

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
      console.error(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
  async uploadFile(ctx, next) {
    try {
      const { file } = ctx.request.files;
      // 检查文件夹是否存在，不存在则创建文件夹
      if (!fs.existsSync(APP_FILE_PATH)) {
        APP_FILE_PATH && fs.mkdirSync(APP_FILE_PATH);
      }
      // 上传的文件具体地址
      let filePath = path.join(
        APP_FILE_PATH || __dirname,
        `${APP_FILE_PATH ? "./" : "../static/"}${file.originalFilename}`
      );
      // 创建可读流（默认一次读64kb）
      const reader = fs.createReadStream(file.filepath);
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
      const fileInfo = {
        id: Date.now(),
        url: APP_NETWORK_PATH + file.originalFilename,
        name: file.originalFilename,
        size: file.size,
        type: file.originalFilename.match(/[^.]+$/)[0],
      };
      ctx.body = response.SUCCESS("common", fileInfo);
    } catch (error) {
      console.error(error);
      ctx.body = response.ERROR("upload");
    }
  }
  async pasteUploadFile(ctx, next) {
    try {
      const { file } = ctx.request.body;
      const dataBuffer = Buffer.from(file, "base64");
      // 生成随机40个字符的hash
      const hash = crypto.randomBytes(20).toString("hex");
      // 文件名
      const filename = hash + ".png";
      let filePath = path.join(
        APP_FILE_PATH || __dirname,
        `${APP_FILE_PATH ? "./" : "../static/"}${filename}`
      );
      // 以写入模式打开文件，文件不存在则创建
      const fd = fs.openSync(filePath, "w");
      // 写入
      fs.writeSync(fd, dataBuffer);
      // 关闭
      fs.closeSync(fd);
      const fileInfo = {
        id: Date.now(),
        url: APP_NETWORK_PATH + filename,
        name: filename,
        size: file.size || "",
        type: 'png',
      };
      ctx.body = response.SUCCESS("common", fileInfo);
    } catch (error) {
      console.error(error);
      ctx.body = response.ERROR("upload");
    }
  }
}

module.exports = new Common();
