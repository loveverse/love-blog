const jwt = require("jsonwebtoken");
const { APP_JWT_SECRET } = require("../config/index");
const response = require("../utils/resData");

// 上传文件时，如果存在token，将token添加到state，方便后面使用，没有或者失效，则返回null
const auth = async (ctx, next) => {
  // 会返回小写secret
  const token = ctx.request.header["love-token"];
  if (token) {
    try {
      const user = jwt.verify(token, APP_JWT_SECRET);
      // 在已经颁发token接口上面添加user对象，便于使用
      ctx.state.user = user;
    } catch (error) {
      ctx.state.user = null;
      console.log(error.name);
      if (error.name === "TokenExpiredError") {
        ctx.body = response.ERROR("tokenExpired");
      } else if (error.name === "JsonWebTokenError") {
        ctx.body = response.ERROR("tokenInvaild");
      } else {
        ctx.body = response.ERROR("unknownError");
      }
      return;
    }
  }
  await next();
};

module.exports = {
  auth,
};
