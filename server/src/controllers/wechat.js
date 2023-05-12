const crypto = require("crypto");
const xml2js = require("xml2js");
const ejs = require("ejs");
const { template, RESULT_STATUS } = require("../utils/constant");
const { APP_ID, APP_SECRET, APP_TOKEN } = require("../config/index");
const response = require("../utils/resData");
const seq = require("../mysql/sequelize");
const WechatModel = require("../models/wechat");
const MWechat = WechatModel(seq);
const AuditModel = require("../models/audit");
const MAudit = AuditModel(seq);
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

class Wechat {
  constructor() {}
  async verifyWechat(ctx, next) {
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
        ctx.body = "token验证失";
      } else {
        // 验证成功
        if (JSON.stringify(ctx.request.body) === "{}") {
          ctx.body = echostr;
        } else {
          // 解析公众号xml
          let obj = await xml2js.parseStringPromise(ctx.request.body);
          let xmlObj = {};
          for (const item in obj.xml) {
            xmlObj[item] = obj.xml[item][0];
          }
          console.log("[ xmlObj.Content ] >", xmlObj);
          const userInfo = await MWechat.findOne({
            where: {
              uid: xmlObj.Content,
            },
          });
          // 查询到信息

          if (userInfo) {
            await MWechat.update(
              { count: userInfo.count + 1 },
              {
                where: {
                  id: userInfo.id,
                },
              }
            );
            const textInfo = JSON.parse(userInfo.text);
            const my = `我的提示\n${textInfo.my || "无"}\n关联wx:${
              userInfo.wx || "无"
            }\n关联qq:${userInfo.qq || "无"}\n\n`;
            const qiqi = `qiqi\n${textInfo.qiqi || "无"}\n\n`;
            const muqin = `muqin\n${textInfo.muqin || "无"}\n\n`;
            const yuequ = `yuequ\n${textInfo.yuequ || "无"}`;
            const count = [
              textInfo.qiqi,
              textInfo.muqin,
              textInfo.yuequ,
            ].filter((k) => k);
            const result = `结论：${RESULT_STATUS[count.length]}\n\n`;
            const str = result + my + muqin + qiqi + yuequ;
            const replyMessageXml = reply(
              str,
              xmlObj.ToUserName,
              xmlObj.FromUserName
            );
            ctx.type = "application/xml";
            ctx.body = replyMessageXml;
          } else {
            const regContent = /[a-zA-Z\d_-]{5,19}/;
            // 5到19位数字或字母_-才增加
            if (regContent.test(xmlObj.Content)) {
              await MAudit.create({
                id: Date.now(),
                wid: xmlObj.FromUserName,
                content: xmlObj.Content,
                count: 0,
                status: false, // 默认未审核
              });
            }
            ctx.body = null;
          }
        }
      }
    } catch (error) {
      console.error(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
  async findUserInfo(ctx, next) {
    try {
      const { size, page } = ctx.request.body;
      const total = await MWechat.findAndCountAll();
      const data = await MWechat.findAll({
        order: [["id", "DESC"]],
        limit: parseInt(size),
        offset: parseInt(size) * (page - 1),
      });
      ctx.body = response.SUCCESS("common", { total: total.count, data });
    } catch (error) {
      console.error(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
  async addUserInfo(ctx, next) {
    try {
      const { uid, name, wx, qq, textInfo } = ctx.request.body;
      const data = await MWechat.create({
        id: Date.now(),
        username: name,
        uid,
        wx,
        qq,
        text: JSON.stringify(textInfo),
      });
      ctx.body = response.SUCCESS("common", data);
    } catch (error) {
      console.error(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
}

module.exports = new Wechat();
