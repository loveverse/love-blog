const DB = require("../mysql/index");

const { SUCESS_RES, ERROR_RES } = require("../utils/resData");

// 书摘的接口----------------------------------------------------------------
const findExcerptSql = "select * from excerpt";
const addExcerptSql =
  "insert into excerpt(content, author, flag,date) values(?,?,?,?)";
const updateExcerptSql = "update excerpt set content = ? where id = ?";
const delExcerptSql = "delete from excerpt where id = ?";

//通过req的hearers来获取客户端ip
// var getIp = function(req) {
//   var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddres || req.socket.remoteAddress || '';
//   if(ip.split(',').length>0){
//     ip = ip.split(',')[0];
//   }
//   return ip;
// };


async function findExcerpt(ctx, next) {
  try {
    // const clientIp = getIp(ctx)
    // console.log(ctx.request.ip);
    ctx.body = SUCESS_RES.getCode(await DB.query(findExcerptSql));
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
  }
}
async function addExcerpt(ctx, next) {
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
}
async function updateExcerpt(ctx, next) {
  try {
    const { id, content } = ctx.request.query;
    const updateExcerptSqlParams = [content, id];
    await DB.query(updateExcerptSql, updateExcerptSqlParams);
    ctx.body = SUCESS_RES.getCode(await DB.query(findExcerptSql));
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
  }
}
async function delExcerpt(ctx, next) {
  try {
    await DB.query(delExcerptSql, ctx.request.query.id);
    ctx.body = SUCESS_RES.getCode(await DB.query(findExcerptSql));
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
  }
}

module.exports = {
  findExcerpt,
  addExcerpt,
  updateExcerpt,
  delExcerpt,
};
