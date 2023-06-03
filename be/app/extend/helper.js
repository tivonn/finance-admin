"use strict";

module.exports = {
  filterParams(rules, params) {
    // 预处理参数
    const newParams = {};
    for (const key in params) {
      if (!rules.hasOwnProperty(key)) continue;
      // 类型转换
      let value = params[key];
      switch (rules[key].type) {
        case "number":
          if (typeof value === "string") {
            value = Number(value);
          }
          break;
        case "boolean":
          if (typeof value === "string") {
            value = value !== "false";
          }
          break;
        case "dateTime":
          // value = moment(value).format('YYYY-MM-DD HH:mm:ss')
          break;
      }
      newParams[key] = value;
    }
    return newParams;
  },
};
