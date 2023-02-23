const { DataTypes } = require("sequelize");
const seq = require("../mysql/sequelize");

const MfileList = seq.define(
  "file_list",
  {
    file_name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      comment: "文件名",
    },
    file_url: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      comment: "文件路径",
    },
    file_size: {
      type: DataTypes.DECIMAL(15,1),
      allowNull: false,
      comment: "文件大小",
    },
    file_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "文件类型",
    },
  },
  {
    // 不需要自动将表名变成复数
    tableName: "file_list",
    freezeTableName: true,
    // timestamps: false,  // 不需要自动创建createAt和updateAt
  }
);

// seq.sync();
// 强制同步数据库
// seq.sync({ force: true });

module.exports = MfileList;
