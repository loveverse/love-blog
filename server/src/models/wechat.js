const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "id"
    },
    uid: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "uid",
      field: "uid",
      unique: "uid"
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "昵称",
      field: "username"
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "头像",
      field: "avatar"
    },
    qq: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "关联qq",
      field: "qq"
    },
    wx: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "关联微信",
      field: "wx"
    },
    ip: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "所在地",
      field: "ip"
    },
    text: {
      type: DataTypes.STRING(5000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "描述",
      field: "text"
    },
    screenshot: {
      type: DataTypes.STRING(5000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "截图",
      field: "screenshot"
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "账号状态",
      field: "status"
    },
    isFraud: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "0：真人；1：骗子",
      field: "is_fraud"
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: "查询次数",
      field: "count"
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
    }
  };
  const options = {
    tableName: "wechat",
    comment: "",
    indexes: []
  };
  const WechatModel = sequelize.define("wechatModel", attributes, options);
  return WechatModel;
};