const DB = require("../mysql/index");
const { SUCESS_RES, ERROR_RES } = require("../utils/resData");

// 网易热评的接口----------------------------------------------------------------
const findSql = "select * from hot";
// 数据库查询10条（0，10）
// limit m(跳过m条),n（取n条记录）
// 倒序拿到10条数据
const pageFindSql = "select * from hot order by id desc limit ?,?";
// 查
async function findHotword(ctx, next) {
  try {
    ctx.body = SUCESS_RES.getCode(await DB.query(findSql));
  } catch (error) {
    ctx.body = ERROR_RES.getCode(null);
  }
}

// 分页查询
async function findPageHotword(ctx, next) {
  try {
    const { limit, page } = ctx.request.query;
    console.log(limit, page);
    /* 
    第一页：0，10（0，10）
    第二页：10，20（10，10）
  */
    // limit后面都是数字类型，转换一下
    const pageFindSqlParams = [limit * (page - 1), +limit];
    // console.log(pageFindSqlParams);
    let total = await DB.query(findSql);
    let list = await DB.query(pageFindSql, pageFindSqlParams);
    // 解决不换行：replace全局替换和v-html
    // list.forEach(e => {
    //   e.content = e.content.replace(/\n/g, "<br/>")
    // })
    ctx.body = SUCESS_RES.getCode({ total: total.length, list });
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
  }
}

module.exports = {
  findHotword,
  findPageHotword,
};
