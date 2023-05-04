const crypto = require("crypto");
const xml2js = require("xml2js");
const ejs = require("ejs");
const response = require("../utils/resData");
const { template } = require("../utils/constant");
const wechat = {
  appID: "wxdf583bd01f25d2a0",
  appSecret: "11e3556b3ac6d21387256f56ed571e4e",
  token: "123456",
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

function parseXML(xml) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(
      xml,
      { trim: true, explicitArray: false, ignoreAttrs: true },
      function (err, result) {
        if (err) {
          return reject(err);
        }
        console.log("[ result ] >", result);
        resolve(result);
      }
    );
  });
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
        let obj = await xml2js.parseStringPromise(ctx.request.body);
        let xmlObj = {};
        for (const item in obj.xml) {
          xmlObj[item] = obj.xml[item][0];
        }
        console.log("[ xmlObj ] >", xmlObj);
        // const formatted = await parseXML(template);

        const replyMessageXml = reply(
          "亲亲陈晓珍",
          xmlObj.ToUserName,
          xmlObj.FromUserName
        );
        console.log("[ rep ] >", replyMessageXml);
        ctx.type = "application/xml";

        ctx.body = replyMessageXml;
        // ctx.body = echostr;
      }
    } catch (error) {
      console.log(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
}

module.exports = new Tieba();
