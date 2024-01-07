"use strict";

const lodash = require("lodash");
const dayjs = require("dayjs");
const math = require('mathjs')

module.exports = {
  // 中间件判断 safeUrl
  isSafeUrl(request, safeUrls) {
    return safeUrls.some(
      (item) =>
        request.path.includes(item.url) && request.method === item.method
    );
  },

  // 预处理参数
  filterParams(rules, params) {
    const newParams = {};
    for (const key in params) {
      if (!rules.hasOwnProperty(key)) continue;
      // 类型转换
      let value = params[key];
      switch (rules[key].type) {
        case "string": {
          // 筛选器，不填内容会传 null，过滤
          if (!lodash.isString(value)) {
            continue;
          }
          break;
        }
        case "number": {
          // get 请求，会传 string，强制转换类型
          if (lodash.isString(value)) {
            value = Number(value);
          }
          break;
        }
        case "boolean": {
          // get 请求，会传 string，强制转换类型
          if (lodash.isString(value)) {
            value = value === "false" ? false : true;
          }
          break;
        }
        case "date": {
          value = dayjs(value).format("YYYY-MM-DD");
          break;
        }
        case "dateTime": {
          value = dayjs(value).format("YYYY-MM-DD HH:mm:ss");
          break;
        }
        case "array": {
          // 筛选器，不填内容会传 null，过滤
          if (!lodash.isArray(value)) {
            continue;
          }
          break;
        }
      }
      newParams[key] = value;
    }
    return newParams;
  },

  // 获取分页参数
  getPageParams(pageIndex, pageSize) {
    return {
      offset: (pageIndex - 1) * pageSize,
      limit: pageSize,
    };
  },

  // 精度计算，返回 number 类型
  calculate(number) {
    return Number(math.format(number, { precision: 14 }))
  },

  // 精度计算，返回 number 类型。位数多时保留两位小数，若尾部为 0 则舍去
  calculateMoney(number) {
    return Number(Number(math.format(number, { precision: 14 })).toFixed(2))
  },
};
