const Mperson = require("../model/person");
const { SUCESS_RES, ERROR_RES } = require("../utils/resData");

// 书摘的接口----------------------------------------------------------------
// 构造函数写法
function Person() {}
// 资源共享，节约内存
Person.prototype.findExcerpt = async function (ctx, next) {
  try {
    ctx.body = SUCESS_RES.getCode(await Mperson.findAll());
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
  }
};
Person.prototype.addExcerpt = async function (ctx, next) {
  try {
    const { content, author, flag, date } = ctx.request.query;
    ctx.body = SUCESS_RES.getCode(
      await Mperson.create({ content, author, flag, date })
    );
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
  }
};
Person.prototype.updateExcerpt = async function (ctx, next) {
  try {
    const { id, content } = ctx.request.query;
    ctx.body = SUCESS_RES.getCode(
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
    ctx.body = ERROR_RES.getCode(null);
  }
};
Person.prototype.delExcerpt = async function (ctx, next) {
  try {
    ctx.body = SUCESS_RES.getCode(
      await Mperson.destroy({
        where: {
          id: ctx.request.query.id,
        },
      })
    );
  } catch (error) {
    console.log(error);
    ctx.body = ERROR_RES.getCode(null);
  }
};

module.exports = new Person();
