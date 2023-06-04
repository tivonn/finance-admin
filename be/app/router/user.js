"use strict";

module.exports = (app) => {
  const { router, controller } = app;
  const routerNamespace = router.namespace("/api/user");
  routerNamespace.post("/", controller.user.create);
  routerNamespace.put("/:id", controller.user.update);
  routerNamespace.post("/list", controller.user.list);
  routerNamespace.get("/info", controller.user.info);
  routerNamespace.post("/login", controller.user.login);
  routerNamespace.post("/logout", controller.user.logout);
  routerNamespace.delete("/:id", controller.user.delete);
};
