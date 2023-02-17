const Missue = require("../model/issue");
const response = require("../utils/resData");

// 问题接口
async function findIssue(ctx, next) {
  try {
    
    let data = await Missue.findAll({ where: { status: 1 } });
    const list = data.map((k) => {
      k.dataValues.fileList = JSON.parse(k.file_list);
      delete k.dataValues.file_list;
      return k;
    });
    ctx.body = response.SUCCESS("common", list);
  } catch (error) {
    console.log(error);
    ctx.body = response.SERVER_ERROR();
  }
}
async function addIssue(ctx, next) {
  try {
    const { title, link, status, fileList } = ctx.request.body;
    console.log(fileList);
    ctx.body = response.SUCCESS(
      "common",
      await Missue.create({
        title,
        link,
        status,
        file_list: fileList || [],
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
