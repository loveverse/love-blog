const { where } = require("sequelize");
const Missue = require("../model/issue");
const response = require("../utils/resData");

// 问题接口
async function findIssue(ctx, next) {
  try {
    // const time = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
    // ctx.set("Expires", time);
    // ctx.set("Cache-Control", "no-cache");
    ctx.body = response.SUCCESS(
      "common",
      await Missue.findAll({ where: { status: 1 } })
    );
  } catch (error) {
    console.log(error);
    ctx.body = response.SERVER_ERROR();
  }
}
async function addIssue(ctx, next) {
  try {
    const { title, link, status, fileList } = ctx.request.body;
    ctx.body = response.SUCCESS(
      "common",
      await Missue.create({
        title,
        link,
        status,
        file_list: JSON.stringify(fileList),
      })
    );
  } catch (error) {
    console.log(error);
    ctx.body = response.SERVER_ERROR();
  }
}
// 删数据是不可能删除的
async function delIssue(ctx, next) {
  try {
    if (!ctx.state.user.is_admin) {
      ctx.body = response.ERROR("powerLacking");
      return;
    }
    const { id } = ctx.request.body;
    ctx.body = response.SUCCESS(
      "common",
      await Missue.update(
        { status: 0 },
        {
          where: {
            id: id,
          },
        }
      )
    );
  } catch (error) {
    console.log(error);
    ctx.body = response.SERVER_ERROR();
  }
}

module.exports = {
  findIssue,
  addIssue,
  delIssue,
};
