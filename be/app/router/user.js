"use strict";

module.exports = (app) => {
  const { router, controller } = app;
  const contactRouter = router.namespace("/api/user");
  contactRouter.post("/login", controller.user.login);
};
