const crypto = require("crypto");
const response = require("../utils/resData");

const seq = require("../mysql/sequelize");
const PersonModel = require("../models/person");
const Mperson = PersonModel(seq);


// 书摘的接口----------------------------------------------------------------
// 构造函数写法
function Person() {}
// 资源共享，节约内存
Person.prototype.findExcerpt = async function (ctx, next) {
  try {
    // 不进行强缓存
    ctx.set("Cache-Control", "no-cache");
    // http1.0的产物
    ctx.set("Pragma", "no-cache");
    const fileBuffer = await Mperson.findAll();
    const str = JSON.stringify(fileBuffer.slice(-2));
    const ifNoneMatch = ctx.request.header["if-none-match"];
    const hash = crypto.createHash("md5");
    hash.update(str);
    const etag = `W/"${hash.digest("hex")}"`;
    // const ifModifiedSince = ctx.request.header["if-modified-since"];
    // const time = fileBuffer[fileBuffer.length - 1].updatedAt.toUTCString();
    // if (ifModifiedSince === time) {
    //   console.log(111);
    //   ctx.status = 304;
    // } else {
    //   console.log(222);
    //   ctx.set("Last-Modified", time);
    //   ctx.body = response.SUCCESS("common", fileBuffer);
    // }
    /* 
      强 ETag 值，不论实体发生多么细微的变化都会改变其值。
      ETag: "usagi-1234"
      弱 ETag 值只用于提示资源是否相同。只有资源发生了根本改变，产生差异时才会改变 ETag 值。
      ETag: W/"usagi-1234"
    */
    // console.log(ctx.request.fresh);

    if (ifNoneMatch === etag) {
      ctx.status = 304;
    } else {
      ctx.set("ETag", etag);
      ctx.body = response.SUCCESS("common", fileBuffer);
    }
  } catch (error) {
    console.error(error);
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
    console.error(error);
    ctx.body = response.SERVER_ERROR();
  }
};
Person.prototype.updateExcerpt = async function (ctx, next) {
  try {
    if (!ctx.state.user.isAdmin) {
      ctx.body = response.ERROR("powerLacking");
      return;
    }
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
    console.error(error);
    ctx.body = response.SERVER_ERROR();
  }
};
Person.prototype.delExcerpt = async function (ctx, next) {
  try {
    if (!ctx.state.user.isAdmin) {
      ctx.body = response.ERROR("powerLacking");
      return;
    }
    ctx.body = response.SUCCESS(
      "delete",
      await Mperson.destroy({
        where: {
          id: ctx.request.query.id,
        },
      })
    );
  } catch (error) {
    console.error(error);
    ctx.body = response.SERVER_ERROR();
  }
};

module.exports = new Person();
