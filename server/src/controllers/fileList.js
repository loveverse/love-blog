const MfileList = require("../model/fileList");
const response = require("../utils/resData");
class FileList {
  async findFileLsit(ctx, next) {
    try {
      if (ctx.state.user) {
        const data = await MfileList.findAll({
          where: { user_id: ctx.state.user.id },
          order: [["id", "DESC"]],
        });
        ctx.body = response.SUCCESS("common", data);
      } else {
        ctx.body = response.SUCCESS("common", await MfileList.findAll());
      }
      // jwt.verify(token, JWT_SECRET, async (error, decoded) => {
      //   // token解析失败
      //   if (error) {
      //     if (error.name === "TokenExpiredError") {
      //       ctx.body = response.ERROR("tokenExpired");
      //     } else if (error.name === "JsonWebTokenError") {
      //       ctx.body = response.ERROR("tokenInvaild");
      //     } else {
      //       ctx.body = response.ERROR("unknownError");
      //     }
      //     return;
      //   }
      //   const data = await MfileList.findAll({
      //     where: { user_id: decoded.id },
      //     order: [["id", "DESC"]],
      //   });
      //   // token解析成功
      //   ctx.body = response.SUCCESS("common", data);
      // });
      // } else {
      //   ctx.body = response.SUCCESS("common", await MfileList.findAll());
      // }
    } catch (error) {
      console.log(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
}
module.exports = new FileList();
