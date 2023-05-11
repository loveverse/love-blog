const { Sequelize } = require("sequelize");
const { APP_DATA_BASE, APP_USERNAME, APP_PASSWORD, APP_HOST } = require("../config/index");
const seq = new Sequelize(APP_DATA_BASE, APP_USERNAME, APP_PASSWORD, {
  host: APP_HOST,
  dialect: "mysql",
  define: {
    timestamps: true,
  },
});
seq
  .authenticate()
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("数据库连接失败", err);
  });

seq.sync();
// 强制同步数据库,会先删除表，然后创建 seq.sync({ force: true });
module.exports = seq;
