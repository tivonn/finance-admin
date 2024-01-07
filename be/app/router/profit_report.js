"use strict";

// 利润
module.exports = (app) => {
    const { router, controller } = app;
    const routerNamespace = router.namespace("/api/profit/report");
    routerNamespace.post("/get_list", controller.profitReport.getProfitReports);
    routerNamespace.post("/", controller.profitReport.updateProfitReports);
};
