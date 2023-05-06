const axios = require("axios");
const response = require("../utils/resData");
const { getClientIP } = require("../utils/common");
const seq = require("../mysql/sequelize");
const IpsModel = require("../models/ips");
const MIps = IpsModel(seq);

class Ips {
  constructor() {}
  async findIpsList(ctx, next) {
    try {
      const { size, page } = ctx.request.body;
      const total = await MIps.findAndCountAll();
      const data = await MIps.findAll({
        order: [["id", "DESC"]],
        limit: parseInt(size),
        offset: parseInt(size) * (page - 1),
      });
      ctx.body = response.SUCCESS("common", { total: total.count, data });
    } catch (error) {
      console.log(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
  async addIps(ctx, next) {
    try {
      const ip = getClientIP(ctx);
      if (ip.length > 6) {
        const info = await axios.get(
          `https://api.vore.top/api/IPdata?ip=${ip}`
        );
        if (info.status === 200) {
          let obj = {
            id: Date.now(),
            ip,
          };
          if (info.data.code === 200) {
            obj.operator = info.data.ipdata.isp;
            obj.address = info.data.adcode.o;
          }
          const data = await MIps.create(obj);
          ctx.body = response.SUCCESS("common", data);
        } else {
          console.log("ip接口请求失败");
        }
      }
    } catch (error) {
      console.log(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
}

module.exports = new Ips();
