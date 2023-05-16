const response = require("../utils/resData");
const { getClientIP } = require("../utils/common");
const seq = require("../mysql/sequelize");
const IpsModel = require("../models/ips");
const MIps = IpsModel(seq);
const client = require("../utils/redis");
const { reqIp } = require("../api/ip");

class Ips {
  constructor() {}
  async findIpsList(ctx, next) {
    try {
      if (!process.env.NODE_ENV) {
        await this.addIps(ctx, next);
      }
      const { size, page } = ctx.request.body;
      const total = await MIps.findAndCountAll();
      const data = await MIps.findAll({
        order: [["id", "DESC"]],
        limit: parseInt(size),
        offset: parseInt(size) * (page - 1),
      });
      ctx.body = response.SUCCESS("common", { total: total.count, data });
    } catch (error) {
      console.error(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
  async addIps(ctx, next) {
    try {
      const ip = getClientIP(ctx);
      const res = await client.get(ip);
      // 没有才在redis中设置
      if (!res) {
        // 需要将值转为字符串
        await client.set(ip, new Date().toString(), {
          EX: 10 * 60, // 以秒为单位存储10分钟
          NX: true, // 键不存在时才进行set操作
        });
        if (ip.length > 6) {
          const obj = {
            id: Date.now(),
            ip,
          };
          const info = await reqIp({ ip });
          if (info.code === 200) {
            obj.operator = info.ipdata.isp;
            obj.address = info.adcode.o;
            await MIps.create(obj);
          } else {
            console.log("ip接口请求失败");
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
    await next();
  }
}

module.exports = new Ips();
