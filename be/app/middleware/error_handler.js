"use strict";

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.app.emit("error", err, ctx);
      const status = err.status || 500;
      // 线上不返回错误堆栈
      const message =
        status === 500 && ctx.app.config.env === "prod"
          ? "Internal Server Error"
          : err.message;
      ctx.status = status;
      ctx.body = { message };
    }
  };
};
