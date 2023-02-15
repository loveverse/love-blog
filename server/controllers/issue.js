const Missue = require("../model/issue");
const response = require("../utils/resData");

// 问题接口
async function findIssue(ctx, next) {
  try {
    const time = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
    ctx.set("Expires", time);
    ctx.body = response.SUCCESS("common", await Missue.findAll());
  } catch (error) {
    console.log(error);
    ctx.body = response.SERVER_ERROR();
  }
}
async function addIssue(ctx, next) {
  try {
    let { title, link, status, file } = ctx.request.body;
    if (!file.id) {
      file = {
        id: "",
        url: "",
        name: "",
      };
    }
    const { id: file_id, url: file_url, name: file_name } = file;
    ctx.body = response.SUCCESS(
      "common",
      await Missue.create({ title, link, status, file_id, file_name, file_url })
    );
  } catch (error) {
    console.log(error);
    ctx.body = response.SERVER_ERROR();
  }
}

module.exports = {
  findIssue,
  addIssue,
};
