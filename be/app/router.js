"use strict";

module.exports = (app) => {
  const { router, controller } = app;
  router.get("/login", controller.user.login);
};
