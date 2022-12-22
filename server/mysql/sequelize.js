const { Sequelize } = require("sequelize");
const { DATA_BASE, USERNAME, PASSWORD, APP_HOST } = require("../config/index");
const seq = new Sequelize(DATA_BASE, USERNAME, PASSWORD, {
  host: APP_HOST,
  dialect: "mysql",
});
seq
  .authenticate()
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("数据库连接失败", err);
  });

module.exports = seq;
