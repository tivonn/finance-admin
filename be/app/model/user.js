"use strict";

module.exports = (app) => {
  const DataTypes = app.Sequelize;
  const sequelize = app.model;

  const User = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
      comment: "id",
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "account",
      comment: "账号",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password",
      comment: "密码",
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "username",
      comment: "名称",
    },
  });

  return User;
};
