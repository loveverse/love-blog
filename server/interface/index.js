const router = require("koa-router")();
const DB = require("../mysql/index");

const response = require("../utils/resData");

// wss.on("connection", function connection(ws) {
//   ws.on("message", async function incoming(message) {
//     // 消息id
//     let messageIndex = 0;
//     const result = await DB.query(findExcerptSql);
//     wss.clients.forEach((client) => {
//       messageIndex++;
//       client.send(JSON.stringify(result));
//     });
//   });
// });

// 网易热评的接口----------------------------------------------------------------
const findSql = "select * from hot";
// 数据库查询10条（0，10）
// limit m(跳过m条),n（取n条记录）
// 倒序拿到10条数据
const pageFindSql = "select * from hot order by id desc limit ?,?";

// 查
router.get("/wy/find", async (ctx, next) => {
  ctx.body = await DB.query(findSql);
});

// 分页查询
router.get("/wy/pageQuery", async (ctx, next) => {
  const { limit, page } = ctx.request.query;
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
  ctx.body = { total: total.length, list };
});

// 书摘的接口----------------------------------------------------------------
const findExcerptSql = "select * from excerpt";
const addExcerptSql =
  "insert into excerpt(content, author, flag,date) values(?,?,?,?)";
const updateExcerptSql = "update excerpt set content = ? where id = ?";
const delExcerptSql = "delete from excerpt where id = ?";

router.get("/findExcerpt", async (ctx, next) => {
  console.log(ctx);
  try {
    ctx.body = response.SUCESS_RES.getCode(await DB.query(findExcerptSql));
  } catch (error) {
    console.log(error);
    // ctx.body = resData.fail(500, "查询失败");
  }
});

router.get("/addExcerpt", async (ctx, next) => {
  const { content, author, flag, date } = ctx.request.query;
  const addExcerptSqlParams = [content, author, flag, date];
  ctx.body = await DB.query(addExcerptSql, addExcerptSqlParams);
});

router.get("/updateExcerpt", async (ctx, next) => {
  const { id, content } = ctx.request.query;
  const updateExcerptSqlParams = [content, id];
  await DB.query(updateExcerptSql, updateExcerptSqlParams);
  ctx.body = await DB.query(findExcerptSql);
});
router.get("/delExcerpt", async (ctx, next) => {
  await DB.query(delExcerptSql, ctx.request.query.id);
  ctx.body = await DB.query(findExcerptSql);
});

module.exports = router;
