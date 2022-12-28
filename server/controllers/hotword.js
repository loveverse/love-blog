const Mhotword = require("../model/hotword");
const { SUCESS_RES, ERROR_RES } = require("../utils/resData");

// 网易热评的接口----------------------------------------------------------------

// 类定义
class Hotword {
  constructor() {}
  async findHotword(ctx, next) {
    try {
      ctx.body = SUCESS_RES.getCode(await Mhotword.findAll());
    } catch (error) {
      ctx.body = ERROR_RES.getCode(null);
    }
  }
  // 分页查询
  async findPageHotword(ctx, next) {
    try {
      const { limit, page } = ctx.request.query;
      // console.log(limit, page);
      /*
      第一页：0，10（0，10）
      第二页：10，20（10，10）
    */
      // 数据库查询10条（0，10）
      // limit m(跳过m条),n（取n条记录）
      // 倒序拿到10条数据
      // limit后面都是数字类型，转换一下
      // let total = await Mhotword.findAll();

      const total = await Mhotword.findAndCountAll();
      let list = await Mhotword.findAll({
        order: [["id", "DESC"]],
        limit: parseInt(limit),
        offset: parseInt(limit) * (page - 1),
      });
      // 解决不换行：replace全局替换和v-html
      // list.forEach(e => {
      //   e.content = e.content.replace(/\n/g, "<br/>")
      // })
      // console.log(list.count,111);

      ctx.body = SUCESS_RES.getCode({ total: total.count, list });
    } catch (error) {
      console.log(error);
      ctx.body = ERROR_RES.getCode(null);
    }
  }
}

module.exports = new Hotword();
