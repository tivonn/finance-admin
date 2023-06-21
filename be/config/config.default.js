"use strict";
const secret = require("./config.secret");
const path = require("path");

exports.keys = secret.db.database;

exports.mysql = {
  client: {
    host: secret.db.host,
    port: secret.db.port,
    user: secret.db.user,
    password: secret.db.password,
    database: secret.db.database,
  },
};

exports.sequelize = {
  dialect: "mysql",
  host: secret.db.host,
  port: secret.db.port,
  username: secret.db.user,
  password: secret.db.password,
  database: secret.db.database,
  timezone: "+08:00",
  define: {
    timestamps: false,
  },
};

exports.multipart = {
  mode: "file",
  tmpdir: path.resolve(__dirname, "../temp"),
  fileExtensions: ["xls", ".xlsx"],
};

exports.middleware = [
  "verifyLogin",
  "setUser",
  "verifyModifiedPassword",
  "errorHandler",
];
