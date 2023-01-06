const Mperson = require("../model/person");
const response = require("../utils/resData");

// 书摘的接口----------------------------------------------------------------
// 构造函数写法
function Person() {}
// 资源共享，节约内存
Person.prototype.findExcerpt = async function (ctx, next) {
  try {
    ctx.body = response.SUCCESS("common", await Mperson.findAll());
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
