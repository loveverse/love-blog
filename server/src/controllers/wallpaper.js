const response = require("../utils/resData");
const seq = require("../mysql/sequelize");
const WallpaperModel = require("../models/wallpaper");
const Mwallpaper = WallpaperModel(seq);

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

      /* 
        设置强缓存，过期时间为20秒,从磁盘读取
        max-age=xxx：过期时间单位秒；
        no-cache：不进行强缓存；
        no-store：不强缓存，也不协商缓存）
        expires,cache-control(优先级高)
        get请求会被浏览器缓存下来，而post请求并不会（可以在响应头设置，但不推荐！）
      */
      // const time = new Date(Date.now() + 30000).toUTCString();
      // ctx.set("Expires", time);
      ctx.set("Cache-Control", "max-age=3600");
      ctx.body = response.SUCCESS("common", { total: total.count, list });
    } catch (error) {
      console.error(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
}

module.exports = new Wallpaper();
