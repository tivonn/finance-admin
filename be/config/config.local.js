"use strict";

const secret = require("./config.secret");

exports.keys = secret.dbLocal.database;

exports.mysql = {
  client: {
    host: secret.dbLocal.host,
    port: secret.dbLocal.port,
    user: secret.dbLocal.user,
    password: secret.dbLocal.password,
    database: secret.dbLocal.database,
  },
};

exports.sequelize = {
  dialect: "mysql",
  host: secret.dbLocal.host,
  port: secret.dbLocal.port,
  username: secret.dbLocal.user,
  password: secret.dbLocal.password,
  database: secret.dbLocal.database,
  timezone: "+08:00",
  define: {
    timestamps: false,
  },
};


exports.cors = {
  origin: "*",
  allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  credentials: true,
};

exports.security = {
  csrf: {
    enable: false,
  },
};
