const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    title: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "标题",
      field: "title"
    },
    link: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "链接",
      field: "link"
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: "编辑状态, 0:不在编辑;1: 在编辑中",
      field: "status"
    },
    fileId: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "文件id",
      field: "file_id"
    },
    fileName: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "文件名",
      field: "file_name"
    },
    fileUrl: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "文件路径",
      field: "file_url"
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "createdAt"
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updatedAt"
    },
    fileList: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "file_list"
    }
  };
  const options = {
    tableName: "issue",
    comment: "",
    indexes: []
  };
  const IssueModel = sequelize.define("issueModel", attributes, options);
  return IssueModel;
};