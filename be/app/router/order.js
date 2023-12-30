"use strict";

// 订单
module.exports = (app) => {
  const { router, controller } = app;
  const routerNamespace = router.namespace("/api/order");
  routerNamespace.post("/list", controller.order.createOrders);
  routerNamespace.post("/get_list", controller.order.getOrders);
  routerNamespace.post(
    "/download_delivery_bills",
    controller.order.downloadDeliveryBill
  );
  routerNamespace.put("/:id", controller.order.updateOrder);
  routerNamespace.delete("/:id", controller.order.deleteOrder);
};
