"use strict";
const secret = require("./config.secret");

exports.keys = "logistics";

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

exports.middleware = [];
