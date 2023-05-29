"use strict";

module.exports = (app) => {
  const { router, controller } = app;
  const routerNamespace = router.namespace("/api/user");
  routerNamespace.get("/info", controller.user.info);
  routerNamespace.get("/init", controller.user.init);
  routerNamespace.post("/login", controller.user.login);
  routerNamespace.post("/logout", controller.user.logout);
};
