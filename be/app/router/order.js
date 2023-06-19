"use strict";

module.exports = (app) => {
  const { router, controller } = app;
  const routerNamespace = router.namespace("/api/order");
  routerNamespace.post("/list", controller.order.createOrders);
  routerNamespace.post("/getlist", controller.order.getOrders);
};
