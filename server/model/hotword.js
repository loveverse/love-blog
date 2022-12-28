const { DataTypes } = require("sequelize");

const seq = require("../mysql/sequelize");

const Mhotword = seq.define(
  "hotword",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "歌曲名",
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "歌曲url",
    },
    picurl: {
      type: DataTypes.STRING,

      defaultValue: 1,
      comment: "歌曲图片url",
    },
    artistsname: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "歌手",
    },
    avatarurl: {
      type: DataTypes.STRING,
      comment: "头像url",
    },
    nickname: {
      type: DataTypes.STRING,
      comment: "发表人",
    },
    content: {
      type: DataTypes.STRING(5000),
      allowNull: false,
      comment: "内容",
    },
    identification: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "标识",
    },
  },
  {
    // 不需要自动将表名变成复数
    tableName: "hotword",
    freezeTableName: true,
    // timestamps: false,  // 不需要自动创建createAt和updateAt
  }
);

seq.sync();
// 强制同步数据库
// seq.sync({ force: true });

module.exports = Mhotword;
