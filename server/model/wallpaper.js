const { DataTypes } = require("sequelize");
const seq = require("../mysql/sequelize");

const Mwallpaper = seq.define(
  "wallpaper",
  {
    type: {
      type: DataTypes.STRING(),
      comment: "类型",
    },
    url: {
      type: DataTypes.STRING(),
      allowNull: false,
      comment: "路径",
    },
    putaway: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      comment: "1:上架(默认);2:下架",
    },
  },
  {
    // 不需要自动将表名变成复数
    tableName: "wallpaper",
    freezeTableName: true,
    timestamps: false, // 不需要自动创建createAt和updateAt
  }
);

module.exports = Mwallpaper;
