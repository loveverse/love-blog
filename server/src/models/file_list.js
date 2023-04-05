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
    fileName: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "文件名",
      field: "file_name"
    },
    fileUrl: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "文件路径",
      field: "file_url"
    },
    fileSize: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "文件大小",
      field: "file_size"
    },
    fileType: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "文件类型",
      field: "file_type"
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
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "文件对应的用户id",
      field: "user_id"
    }
  };
  const options = {
    tableName: "file_list",
    comment: "",
    indexes: []
  };
  const FileListModel = sequelize.define("fileListModel", attributes, options);
  return FileListModel;
};