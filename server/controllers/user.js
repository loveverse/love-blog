const Muser = require("../model/user");
const response = require("../utils/resData");
const bcrypt = require("bcryptjs");
// 类定义
class User {
  constructor() {}
  // 注册用户
  async register(ctx, next) {
    try {
      const { userName: user_name, password } = ctx.request.body;
      if (!user_name || !password) {
        ctx.body = response.verifyMsg("用户名或密码不能为空");
        return;
      }
      // 数据传过来开始加密
      const salt = bcrypt.genSaltSync(10);
      // hash保存的是 密文
      const hash = bcrypt.hashSync(password, salt);
      // 判断用户是否存在
      const isExist = await Muser.findOne({
        where: {
          user_name: user_name,
        },
      });
      if (isExist) {
        const res = await Muser.findOne({
          where: {
            user_name: user_name,
          },
        });
        const isCorrect = bcrypt.compareSync(password, res.password);
        ctx.body = response.verifyMsg(
          isCorrect ? "登录成功" : "用户已经存在",
          isCorrect ? 200 : 400
        );
      } else {
        ctx.body = response.SUCESS_RES.getCode(
          await Muser.create({ user_name, password: hash })
        );
      }
    } catch (error) {
      ctx.body = response.ERROR_RES.getCode(null);
    }
  }
  // // 分页查询
  // async findPageHotword(ctx, next) {
  //   try {
  //     const { limit, page } = ctx.request.query;
  //     // console.log(limit, page);
  //     /*
  //     第一页：0，10（0，10）
  //     第二页：10，20（10，10）
  //   */
  //     // 数据库查询10条（0，10）
  //     // limit m(跳过m条),n（取n条记录）
  //     // 倒序拿到10条数据
  //     // limit后面都是数字类型，转换一下
  //     // let total = await Mhotword.findAll();

  //     const total = await Mhotword.findAndCountAll();
  //     let list = await Mhotword.findAll({
  //       order: [["id", "DESC"]],
  //       limit: parseInt(limit),
  //       offset: parseInt(limit) * (page - 1),
  //     });
  //     // 解决不换行：replace全局替换和v-html
  //     // list.forEach(e => {
  //     //   e.content = e.content.replace(/\n/g, "<br/>")
  //     // })
  //     // console.log(list.count,111);

  //     ctx.body = SUCESS_RES.getCode({ total: total.count, list });
  //   } catch (error) {
  //     console.log(error);
  //     ctx.body = ERROR_RES.getCode(null);
  //   }
  // }
}

module.exports = new User();
