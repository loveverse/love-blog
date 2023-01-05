const bcrypt = require("bcryptjs");
const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body;

  const salt = bcrypt.genSaltSync(10);
  // hash保存的是 密文
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash;

  await next();
};
const verifyLogin = async (ctx, next) => {
  const { userName: user_name, password } = ctx.request.body;
  try {
    
  } catch (error) {
    
  }
};
module.exports = {
  crpytPassword,
};
