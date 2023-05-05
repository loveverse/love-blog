const crypto = require("crypto");
const xml2js = require("xml2js");
const ejs = require("ejs");
const response = require("../utils/resData");
const { template } = require("../utils/constant");
const { APP_ID, APP_SECRET, APP_TOKEN } = require("../config/index");
const seq = require("../mysql/sequelize");
const TiebaModel = require("../models/tieba");
const MTieba = TiebaModel(seq);
const wechat = {
  appID: APP_ID,
  appSecret: APP_SECRET,
  token: APP_TOKEN,
};

const compiled = ejs.compile(template);
function reply(content = "", fromUsername, toUsername) {
  const info = {};
  let type = "text";
  info.content = content;
  if (Array.isArray(content)) {
    type = "news";
  } else if (typeof content === "object") {
    if (content.hasOwnProperty("type")) {
      type = content.type;
      info.content = content.content;
    } else {
      type = "music";
    }
  }
  info.msgType = type;
  info.createTime = new Date().getTime();
  info.fromUsername = fromUsername;
  info.toUsername = toUsername;
  return compiled(info);
}

class Tieba {
  constructor() {}
  async wechat(ctx, next) {
    try {
      let {
        signature = "",
        timestamp = "",
        nonce = "",
        echostr = "",
      } = ctx.query;
      const token = wechat.token;
      // 验证token
      let str = [token, timestamp, nonce].sort().join("");
      let sha1 = crypto.createHash("sha1").update(str).digest("hex");
      if (sha1 !== signature) {
        ctx.body = "token验证失败";
      } else {
        // 验证成功
        if (JSON.stringify(ctx.request.body) === "{}") {
          console.log("[  ] >", echostr);
          ctx.body = echostr;
        } else {
          let obj = await xml2js.parseStringPromise(ctx.request.body);
          let xmlObj = {};
          for (const item in obj.xml) {
            xmlObj[item] = obj.xml[item][0];
          }
          const replyMessageXml = reply(
            "123454",
            xmlObj.ToUserName,
            xmlObj.FromUserName
          );
          console.log("[ re ] >", replyMessageXml);
          ctx.type = "application/xml";
          ctx.body = replyMessageXml;
        }
      }
    } catch (error) {
      console.log(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
  async findUserInfo(ctx, next) {
    try {
      const { size, page } = ctx.request.body;
      const total = await MTieba.findAndCountAll();
      const data = await MTieba.findAll({
        order: [["id"]],
        limit: parseInt(size),
        offset: parseInt(size) * (page - 1),
      });
      ctx.body = response.SUCCESS("common", { total: total.count, data });
    } catch (error) {
      console.log(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
}

module.exports = new Tieba();
