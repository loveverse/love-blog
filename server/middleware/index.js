const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/index");
const response = require("../utils/resData");

const auth = async (ctx, next) => {
  // 会返回小写secret
  const token = ctx.request.header["love-token"];

  console.log(token);
  try {
    const user = jwt.verify(token, JWT_SECRET);
    // 在已经颁发token接口上面添加user对象，便于使用
    ctx.state.user = user;
  } catch (err) {
    console.log(err.name);
    switch (err.name) {
      case "TokenExpiredError":
        ctx.body = response.ERROR("tokenExpired");
        return;
      case "JsonWebTokenError":
        ctx.body = response.ERROR("tokenInvaild");
        return;
      default:
        ctx.body = response.ERROR("unknownError");
        return;
    }
  }
  await next();
};

module.exports = {
  auth,
};
