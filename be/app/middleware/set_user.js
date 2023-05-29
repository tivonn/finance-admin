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
      });
      const { account, role, username } = user;
      ctx.state.user = { username, account, role };
    } catch {
      ctx.state.user = {};
    }
    await next();
  };
};
