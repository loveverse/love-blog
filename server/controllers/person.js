const bcrypt = require("bcryptjs");
const Mperson = require("../model/person");
const response = require("../utils/resData");

// 书摘的接口----------------------------------------------------------------
// 构造函数写法
function Person() {}
// 资源共享，节约内存
Person.prototype.findExcerpt = async function (ctx, next) {
  try {
    // 不进行强缓存
    ctx.set("Cache-Control", "no-cache");
    const fileBuffer = await Mperson.findAll();
    // const str = JSON.stringify(fileBuffer.slice(-2));
    // const ifNoneMatch = ctx.request.header["if-none-match"];
    // const hash = bcrypt.hashSync(str, bcrypt.genSaltSync(10));
    // if (bcrypt.compareSync(str, 1)) {
    //   ctx.status = 304;
    // } else {
      ctx.set("etag", hash);
      ctx.body = response.SUCCESS("common", fileBuffer);
    // }
  } catch (error) {
    console.log(error);
    ctx.body = response.SERVER_ERROR();
  }
};
Person.prototype.addExcerpt = async function (ctx, next) {
  try {
    const { content, author, flag, date } = ctx.request.query;
    ctx.body = response.SUCCESS(
      "common",
      await Mperson.create({ content, author, flag, date })
    );
  } catch (error) {
    console.log(error);
    ctx.body = response.SERVER_ERROR();
  }
};
Person.prototype.updateExcerpt = async function (ctx, next) {
  try {
    const { id, content } = ctx.request.query;
    ctx.body = response.SUCCESS(
      "common",
      await Mperson.update(
        { content: content },
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
};
Person.prototype.delExcerpt = async function (ctx, next) {
  try {
    if (!ctx.state.user.is_admin) {
      ctx.body = response.ERROR("powerLacking");
      return;
    }
    ctx.body = response.SUCCESS(
      "common",
      await Mperson.destroy({
        where: {
          id: ctx.request.query.id,
        },
      })
    );
  } catch (error) {
    console.log(error);
    ctx.body = response.SERVER_ERROR();
  }
};

module.exports = new Person();
