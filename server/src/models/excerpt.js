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
    content: {
      type: DataTypes.STRING(5000),
      allowNull: false,
      defaultValue: "",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "content"
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "author"
    },
    flag: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "flag"
    },
    date: {
      type: DataTypes.STRING(5000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date"
    }
  };
  const options = {
    tableName: "excerpt",
    comment: "",
    indexes: []
  };
  const ExcerptModel = sequelize.define("excerptModel", attributes, options);
  return ExcerptModel;
};