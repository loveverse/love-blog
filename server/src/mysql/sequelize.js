
const { Sequelize } = require("sequelize");
const { DATA_BASE, USERNAME, PASSWORD, APP_HOST } = require("../config/index");
const seq = new Sequelize(DATA_BASE, USERNAME, PASSWORD, {
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
