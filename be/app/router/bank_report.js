"use strict";

module.exports = (app) => {
    const { router, controller } = app;
    const routerNamespace = router.namespace("/api/bank/report");
    routerNamespace.post("/get_list", controller.bankReport.getBankReports);
    routerNamespace.post("/", controller.bankReport.createBankReport);
};
