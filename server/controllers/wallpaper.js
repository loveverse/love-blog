const Mwallpaper = require("../model/wallpaper");
const response = require("../utils/resData");

// 壁纸的接口----------------------------------------------------------------

// 类定义
class Wallpaper {
  constructor() {}
  // async findHotword(ctx, next) {
  //   try {
  //     ctx.body = response.SUCCESS("common", await Mwallpaper.findAll());
  //   } catch (error) {
  //     ctx.body = response.SERVER_ERROR();
  //   }
  // }
  // 分页查询
  async findPageWallpaper(ctx, next) {
    try {
      const { limit, page } = ctx.request.body;
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

      const total = await Mwallpaper.findAndCountAll();
      let list = await Mwallpaper.findAll({
        order: [["id"]],
        limit: parseInt(limit),
        offset: parseInt(limit) * (page - 1),
      });
      // 解决不换行：replace全局替换和v-html
      // list.forEach(e => {
      //   e.content = e.content.replace(/\n/g, "<br/>")
      // })
      // console.log(list.count,111);

      ctx.body = response.SUCCESS("common", { total: total.count, list });
    } catch (error) {
      console.log(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
}

module.exports = new Wallpaper();
