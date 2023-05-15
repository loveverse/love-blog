const response = require("../utils/resData");
const seq = require("../mysql/sequelize");
const AuditModel = require("../models/audit");
const MAudit = AuditModel(seq);

class Audit {
  constructor() {}
  async findAuditPage(ctx, next) {
    try {
      const { size, page } = ctx.request.body;
      const total = await MAudit.findAndCountAll();
      const data = await MAudit.findAll({
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
  async updateAudit(ctx, next) {
    try {
      const { id } = ctx.request.body;
      const data = await MAudit.update({ status: true }, { where: { id } });
      ctx.body = response.SUCCESS("common", data);
    } catch (error) {
      console.error(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
  async deleteAudit(ctx, next) {
    try {
      const { id } = ctx.request.body;
      const data = await MAudit.destroy({ where: { id } });
      ctx.body = response.SUCCESS("delete", data);
    } catch (error) {
      console.error(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
}
module.exports = new Audit();
