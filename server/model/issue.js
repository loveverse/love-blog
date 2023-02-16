const { DataTypes } = require("sequelize");

const seq = require("../mysql/sequelize");

const Missue = seq.define(
  "issue",
  {
    title: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: false,
      comment: "标题",
    },
    link: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: true,
      comment: "链接",
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: "编辑状态, 0:不在编辑;1: 在编辑中",
    },
    file_list: {
      type: DataTypes.JSON,
      allowNull: true,
      unique: false,
      comment: "文件列表"
    },
    // file_id: {
    //   type: DataTypes.CHAR(255),
    //   allowNull: true,
    //   unique: false,
    //   comment: "文件id",
    // },
    // file_name: {
    //   type: DataTypes.CHAR(255),
    //   allowNull: true,
    //   unique: false,
    //   comment: "文件名",
    // },
    // file_url: {
    //   type: DataTypes.CHAR(255),
    //   allowNull: true,
    //   unique: false,
    //   comment: "文件路径",
    // },
  },
  {
    tableName: "issue",
    freezeTableName: true,
  }
);
// seq.sync();
// Missue.sync()



module.exports = Missue;
