const crypto = require("crypto");
const xml2js = require("xml2js");
const ejs = require("ejs");
const { Op } = require("sequelize");
const { template, RESULT_STATUS, NAME_INFO } = require("../utils/constant");
const { APP_ID, APP_SECRET, APP_TOKEN } = require("../config/index");
const response = require("../utils/resData");
const seq = require("../mysql/sequelize");
const WechatModel = require("../models/wechat");
const MWechat = WechatModel(seq);
const AuditModel = require("../models/audit");
const MAudit = AuditModel(seq);
const InvalidModel = require("../models/invalid");
const MInvalid = InvalidModel(seq);

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
  // 公众号验证
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
          console.info("[ xmlObj.Content ] >", xmlObj);
          // 文本消息
          if (xmlObj.MsgType === "text") {
            const userInfo = await MWechat.findOne({
              where: {
                uid: xmlObj.Content.trim(), // 去掉首尾空格
              },
            });
            // 查询到信息
            if (userInfo) {
              await MWechat.update(
                { count: userInfo.count + 1 },
                { where: { id: userInfo.id } }
              );
              const textInfo = JSON.parse(userInfo.text);
              const my = `我的提示\n${textInfo.my || "无"}\n关联wx：${
                userInfo.wx || "无"
              }\n关联qq：${userInfo.qq || "无"}\n`;
              const qiqi = `${NAME_INFO.q}\n${textInfo.qiqi || "无"}\n`;
              const muqin = `${NAME_INFO.m}\n${textInfo.muqin || "无"}\n`;
              const yuequ = `${NAME_INFO.y}\n${textInfo.yuequ || "无"}`;
              const count = [
                textInfo.my,
                textInfo.qiqi,
                textInfo.muqin,
                textInfo.yuequ,
              ].filter((k) => k);
              const result = `结论：${RESULT_STATUS[count.length]}\n\n`;
              // 0:真人
              const str = userInfo.isFraud
                ? result + my + muqin + qiqi + yuequ
                : textInfo.my;
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
              } else {
                // 数据分析
                await MInvalid.create({
                  wid: xmlObj.FromUserName,
                  content: xmlObj.Content,
                });
              }
              ctx.body = null;
            }
            // 关注消息
          } else if (xmlObj.MsgType === "event") {
            if (xmlObj.Event === "subscribe") {
              const str =
                "您好，谢谢您的关注！输入uid即可进行查询，如有包含骗子字段，请注意防骗！如未回复，说明没有收录。";
              const replyMessageXml = reply(
                str,
                xmlObj.ToUserName,
                xmlObj.FromUserName
              );
              ctx.type = "application/xml";
              ctx.body = replyMessageXml;
            } else {
              ctx.body = null;
            }
            // 其他消息
          } else {
            const str =
              "暂时不支持该消息格式，如果您有好的建议或者想法，请联系管理员，也许会在将来的某一天实现！(v:zcb99735)";
            const replyMessageXml = reply(
              str,
              xmlObj.ToUserName,
              xmlObj.FromUserName
            );
            ctx.type = "application/xml";
            ctx.body = replyMessageXml;
          }
        }
      }
    } catch (error) {
      console.error(error);
      // 返回500，公众号会报错
      ctx.body = null;
    }
  }
  // 分页用户列表
  async findUserInfo(ctx, next) {
    try {
      const { size, page, searchVal } = ctx.request.body;
      const obj = searchVal
        ? {
            [Op.or]: [
              {
                uid: {
                  [Op.like]: "%" + searchVal + "%",
                },
              },
              {
                wx: {
                  [Op.like]: "%" + searchVal + "%",
                },
              },
            ],
          }
        : {};
      const total = await MWechat.findAndCountAll({
        where: obj,
      });
      const data = await MWechat.findAll({
        order: [["id", "DESC"]],
        limit: parseInt(size),
        offset: parseInt(size) * (page - 1),
        where: obj,
      });
      const list = data.map((item) => {
        item.text = JSON.parse(item.text);
        return item;
      });
      ctx.body = response.SUCCESS("common", { total: total.count, data: list });
    } catch (error) {
      console.error(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
  // 增加用户
  async addUserInfo(ctx, next) {
    try {
      const { uid, name, wx, qq, textInfo, isFraud } = ctx.request.body;
      const data = await MWechat.create({
        id: Date.now(),
        username: name,
        uid,
        wx,
        qq,
        isFraud,
        text: JSON.stringify(textInfo),
      });
      ctx.body = response.SUCCESS("common", data);
    } catch (error) {
      console.error(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
  // 编辑用户
  async editUserInfo(ctx, next) {
    try {
      const { id, uid, name, wx, qq, textInfo, isFraud } = ctx.request.body;
      const data = await MWechat.update(
        {
          username: name,
          uid,
          wx,
          qq,
          isFraud,
          text: JSON.stringify(textInfo),
        },
        { where: { id } }
      );
      ctx.body = response.SUCCESS("edit", data);
    } catch (error) {
      console.error(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
  // 删除用户
  async deleteUser(ctx, next) {
    try {
      const { id } = ctx.request.body;
      const data = await MWechat.destroy({
        where: { id },
      });
      ctx.body = response.SUCCESS("delete", data);
    } catch (error) {
      console.error(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
  // 模糊查询用户uid筛选
  async findOneUserInfo(ctx, next) {
    try {
      const { uid } = ctx.request.body;
      const data = await MWechat.findAll({
        // 返回特定的属性
        attributes: ["id", "uid"],
        where: {
          uid: {
            [Op.like]: "%" + uid + "%",
          },
        },
      });
      ctx.body = response.SUCCESS("common", data);
    } catch (error) {
      console.error(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
}

module.exports = new Wechat();
