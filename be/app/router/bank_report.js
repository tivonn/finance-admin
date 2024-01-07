"use strict";

// 银行账
module.exports = (app) => {
    const { router, controller } = app;
    const routerNamespace = router.namespace("/api/bank/report");
    routerNamespace.post("/get_list", controller.bankReport.getBankReports);
    routerNamespace.put("/", controller.bankReport.createBankReport);
};
