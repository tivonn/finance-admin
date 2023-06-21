"use strict";

module.exports = (app) => {
  const { router, controller } = app;
  const routerNamespace = router.namespace("/api/order");
  routerNamespace.post("/list", controller.order.createOrders);
  routerNamespace.post("/get_list", controller.order.getOrders);
  routerNamespace.put("/:id", controller.order.updateOrder);
  routerNamespace.delete("/:id", controller.order.deleteOrder);
};
