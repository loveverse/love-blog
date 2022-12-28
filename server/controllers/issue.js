const Missue = require("../model/issue");
const { SUCESS_RES, ERROR_RES } = require("../utils/resData");

// 问题接口
async function findIssue(ctx, next) {
  try {
    ctx.body = SUCESS_RES.getCode(await Missue.findAll());
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
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
    ctx.body = SUCESS_RES.getCode(
      await Missue.create({ title, link, status, file_id, file_name, file_url })
    );
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
  }
}

module.exports = {
  findIssue,
  addIssue,
};
