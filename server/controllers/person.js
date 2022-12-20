const DB = require("../mysql/index");

const { SUCESS_RES, ERROR_RES } = require("../utils/resData");

// 书摘的接口----------------------------------------------------------------
const findExcerptSql = "select * from excerpt";
const addExcerptSql =
  "insert into excerpt(content, author, flag,date) values(?,?,?,?)";
const updateExcerptSql = "update excerpt set content = ? where id = ?";
const delExcerptSql = "delete from excerpt where id = ?";
// 构造函数写法
function Person() {}
// 资源共享，节约内存
Person.prototype.findExcerpt = async function (ctx, next) {
  try {
    // const clientIp = getIp(ctx)
    // console.log(ctx.request.ip);
    ctx.body = SUCESS_RES.getCode(await DB.query(findExcerptSql));
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
  }
};
Person.prototype.addExcerpt = async function (ctx, next) {
  try {
    const { content, author, flag, date } = ctx.request.query;
    const addExcerptSqlParams = [content, author, flag, date];
    ctx.body = SUCESS_RES.getCode(
      await DB.query(addExcerptSql, addExcerptSqlParams)
    );
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
  }
};
Person.prototype.updateExcerpt = async function (ctx, next) {
  try {
    const { id, content } = ctx.request.query;
    const updateExcerptSqlParams = [content, id];
    await DB.query(updateExcerptSql, updateExcerptSqlParams);
    ctx.body = SUCESS_RES.getCode(await DB.query(findExcerptSql));
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
  }
};
Person.prototype.delExcerpt = async function (ctx, next) {
  try {
    await DB.query(delExcerptSql, ctx.request.query.id);
    ctx.body = SUCESS_RES.getCode(await DB.query(findExcerptSql));
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
  }
};

module.exports = new Person();
