"use strict";

// 用户
module.exports = (app) => {
  const { router, controller } = app;
  const routerNamespace = router.namespace("/api/user");
  routerNamespace.post("/", controller.user.createUser);
  routerNamespace.put("/:id", controller.user.updateUser);
  routerNamespace.post("/get_list", controller.user.getUsers);
  routerNamespace.get("/info", controller.user.getUserInfo);
  routerNamespace.post("/login", controller.user.login);
  routerNamespace.post("/logout", controller.user.logout);
  routerNamespace.delete("/:id", controller.user.deleteUser);
};
