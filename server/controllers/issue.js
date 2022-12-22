const DB = require("../mysql/index");
const { SUCESS_RES, ERROR_RES } = require("../utils/resData");

// 问题接口
const findIssuetSql = "select * from issue";
const addIssueSql =
  "insert into issue(title,link,status,file_id,file_name,file_url) values(?,?,?,?,?,?)";
// const updateIssueSql = "update issue set content = ? where id = ?";
const delIssueSql = "delete from issue where id = ?";

async function findIssue(ctx, next) {
  try {
    ctx.body = SUCESS_RES.getCode(await DB.query(findIssuetSql));
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
  }
}
async function addIssue(ctx, next) {
  try {
    let { title, link, status, file } = ctx.request.body;
    console.log(ctx.request.body);

    if (!file.id) {
      file = {
        id: "",
        url: "",
        name: "",
      };
    }
    const { id: file_id, url: file_url, name: file_name } = file;
    const params = [title, link, status, file_id, file_name, file_url];
    console.log(params);
    ctx.body = SUCESS_RES.getCode(await DB.query(addIssueSql, params));
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
  }
}

module.exports = {
  findIssue,
  addIssue,
};
