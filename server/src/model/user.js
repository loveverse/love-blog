const { DataTypes } = require("sequelize");
const seq = require("../mysql/sequelize");

const Muser = seq.define(
  "user",
  {
    user_name: {
      type: DataTypes.STRING(),
      allowNull: false, // 默认值是true
      unique: true, // 默认值是false
      comment: "用户名",
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: "密码",
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "0:不是管理员(默认);1:是管理员",
    },
  },
  {
    // 不需要自动将表名变成复数
    tableName: "user",
    freezeTableName: true,
    // timestamps: false,  // 不需要自动创建createAt和updateAt
  }
);




module.exports = Muser;
