"use strict";

module.exports = () => {
  return async (ctx, next) => {
    console.log(ctx.request.path);
    const safeUrls = ["/api/user/info", "/api/user/login"];
    if (safeUrls.includes(ctx.request.path)) {
      await next();
    } else {
      const cookieValue = ctx.cookies.get("cookie");
      if (cookieValue) {
        const cookie = await ctx.model.Cookies.findOne({
          where: { cookie: cookieValue },
        });
        if (cookie) {
          await next();
        } else {
          ctx.throw(401);
        }
      } else {
        ctx.throw(401);
      }
    }
  };
};
