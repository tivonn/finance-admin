"use strict";

module.exports = () => {
  return async (ctx, next) => {
    const safeUrls = [
      {
        url: "/api/user",
        method: "PUT",
      },
      ,
      {
        url: "/api/user/info",
        method: "GET",
      },
      {
        url: "/api/user/login",
        method: "POST",
      },
    ];
    if (ctx.helper.isSafeUrl(ctx.request, safeUrls)) {
      // 白名单内的接口，放行
      await next();
    } else {
      // 白名单外的接口，需用户已修改过密码，才放行;
      if (ctx.state.user.is_modified_password) {
        await next();
      } else {
        ctx.throw(403);
      }
    }
  };
};
