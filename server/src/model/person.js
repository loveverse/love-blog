const { DataTypes } = require("sequelize");

const seq = require("../mysql/sequelize");

const Mperson = seq.define(
  "person",
  {
    content: {
      type: DataTypes.STRING(5000),
      allowNull: false, // 默认值是true
      // unique: false,  // 默认值是false
      comment: "内容",
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "作者",
    },
    flag: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: "编辑状态, 1:不在编辑;0: 在编辑中",
    },
    date: {
      type: DataTypes.STRING,
      comment: "发布时间",
    },
  },
  {
    // 不需要自动将表名变成复数
    tableName: "person",
    freezeTableName: true,
    // timestamps: false,  // 不需要自动创建createAt和updateAt
  }
);

// seq.sync();
// 强制同步数据库
// seq.sync({ force: true });

module.exports = Mperson;
