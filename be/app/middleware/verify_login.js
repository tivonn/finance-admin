"use strict";

const dayjs = require("dayjs");

module.exports = () => {
  return async (ctx, next) => {
    const safeUrls = [
      {
        url: "/api/user/login",
        method: "POST",
      },
    ];
    if (ctx.helper.isSafeUrl(ctx.request, safeUrls)) {
      // 白名单内的接口，放行
      await next();
    } else {
      // 白名单外的接口，需携带有效 cookie，才放行
      const cookieValue = ctx.cookies.get("cookie");
      if (cookieValue) {
        const cookie = await ctx.model.Cookies.findOne({
          where: { cookie: cookieValue },
        });
        if (cookie) {
          const isExpires = dayjs(cookie.expires).isBefore(dayjs());
          if (isExpires) {
            // cookie 过期
            ctx.throw(401);
          } else {
            await next();
          }
        } else {
          ctx.throw(401);
        }
      } else {
        ctx.throw(401);
      }
    }
  };
};
