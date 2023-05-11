const response = require("../utils/resData");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_JWT_SECRET } = require("../config/index");
const seq = require("../mysql/sequelize");
const UserModel = require("../models/user");
const Muser = UserModel(seq);
// 类定义
class User {
  constructor() {}
  // 注册用户
  async register(ctx, next) {
    try {
      const { userName: user_name, password: pass_word } = ctx.request.body;
      if (!user_name || !pass_word) {
        ctx.body = response.ERROR("userNotNull");
        return;
      }
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
        // 密码是否正确
        if (bcrypt.compareSync(pass_word, res.dataValues.password)) {
          // 登录成功
          const { password, ...data } = res.dataValues;
          ctx.body = response.SUCCESS("userLogin", {
            token: jwt.sign(data, APP_JWT_SECRET, { expiresIn: "30d" }),
            userInfo: res.dataValues,
          });
        } else {
          ctx.body = response.ERROR("userAlreadyExist");
        }
      } else {
        // 加密
        const salt = bcrypt.genSaltSync(10);
        // hash保存的是 密文
        const hash = bcrypt.hashSync(pass_word, salt);
        const userInfo = await Muser.create({ user_name, password: hash });
        const { password, ...data } = userInfo.dataValues;
        ctx.body = response.SUCCESS("userRegister", {
          token: jwt.sign(data, APP_JWT_SECRET, { expiresIn: "30d" }),
          userInfo,
        });
      }
    } catch (error) {
      console.error(error);
      ctx.body = response.SERVER_ERROR();
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
  //     console.error(error);
  //     ctx.body = ERROR_RES.getCode(null);
  //   }
  // }
}

module.exports = new User();
