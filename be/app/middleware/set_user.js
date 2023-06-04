"use strict";

module.exports = () => {
  return async (ctx, next) => {
    try {
      const cookieValue = ctx.cookies.get("cookie");
      const cookie = await ctx.model.Cookies.findOne({
        where: { cookie: cookieValue },
      });
      const { user_id } = cookie;
      const user = await ctx.model.Users.findOne({
        where: {
          id: user_id,
        },
        // 过滤返回数据
        attributes: {
          exclude: ["is_delete", "create_at", "update_at"],
        },
      });
      ctx.state.user = user;
    } catch {
      ctx.state.user = {};
    }
    await next();
  };
};
