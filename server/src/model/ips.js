const { DataTypes } = require("sequelize");
const seq = require("../mysql/sequelize");

const Muser = seq.define(
  "ips",
  {
    ip: {
      type: DataTypes.STRING(),
      comment: "ip地址",
    },
    address: {
      type: DataTypes.STRING(),
      comment: "城市地址",
    },
    operator: {
      type: DataTypes.STRING(),
      comment: "运营商",
    },
    device: {
      type: DataTypes.STRING(),
      comment: "设备",
    },
    deleted_at: {
      pa
    }
  },
  {
    // 不需要自动将表名变成复数
    tableName: "user",
    freezeTableName: true,
    // timestamps: false,  // 不需要自动创建createAt和updateAt
  }
);

module.exports = Muser;
