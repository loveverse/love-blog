const response = require("../utils/resData");
const seq = require("../mysql/sequelize");
const IssueModel = require("../models/issue");
const Missue = IssueModel(seq);
// 问题接口
async function findIssue(ctx, next) {
  try {
    let list = await Missue.findAll({
      where: { status: 1 },
      order: [["id", "DESC"]],
    });
    const data = list.map((k) => {
      k.dataValues.fileList = k.fileList !== "[]" ? JSON.parse(k.fileList) : [];
      delete k.dataValues.status;
      return k;
    });
    ctx.body = response.SUCCESS("common", data);
  } catch (error) {
    console.error(error);
    ctx.body = response.SERVER_ERROR();
  }
}
async function addIssue(ctx, next) {
  try {
    const { title, link, fileList } = ctx.request.body;
    const data = await Missue.create({
      title,
      link,
      status: 1, // 逻辑位
      fileList: JSON.stringify(fileList),
    });
    ctx.body = response.SUCCESS("common", data);
  } catch (error) {
    console.error(error);
    ctx.body = response.SERVER_ERROR();
  }
}
// 删数据是不可能删除的
async function delIssue(ctx, next) {
  try {
    const { id } = ctx.request.body;
    const data = await Missue.update({ status: 0 }, { where: { id } });
    ctx.body = response.SUCCESS("delete", data);
  } catch (error) {
    console.error(error);
    ctx.body = response.SERVER_ERROR();
  }
}

async function editIssue(ctx, next) {
  try {
    const { id, title, link, fileList } = ctx.request.body;
    ctx.body = response.SUCCESS(
      "common",
      await Missue.update(
        {
          title,
          link,
          status: 1, // 逻辑位
          fileList: JSON.stringify(fileList),
        },
        {
          where: {
            id: id,
          },
        }
      )
    );
  } catch (error) {
    console.error(error);
    ctx.body = response.SERVER_ERROR();
  }
}
module.exports = {
  findIssue,
  addIssue,
  delIssue,
  editIssue,
};
