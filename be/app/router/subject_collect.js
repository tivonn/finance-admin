"use strict";

// 科目汇总
module.exports = (app) => {
    const { router, controller } = app;
    const routerNamespace = router.namespace("/api/subject/collect");
    routerNamespace.post("/get_list", controller.subjectCollect.getSubjectCollects);
};
