"use strict";

const Service = require("egg").Service;
const dayjs = require("dayjs");
const { v4: uuid } = require("uuid");

class UserService extends Service {
  get usersModel() {
    return this.app.model.Users;
  }

  get cookiesModel() {
    return this.app.model.Cookies;
  }

  async info() {
    const { ctx } = this;
    return ctx.state.user;
  }

  async init() {
    const { ctx } = this;
    return "init";
  }

  async login(params) {
    const { ctx } = this;
    const { account, password } = params;
    const user = await this.usersModel.findOne({
      where: {
        account,
        password,
      },
    });
    if (user) {
      // 账号密码正确，登录

      // 设置 cookie
      const expires = dayjs().add(30, "day").toDate(); // cookie 一个月有效期
      const cookieValue = uuid();
      ctx.cookies.set("cookie", cookieValue, {
        expires,
      });

      // 记录用户 cookie&expires
      const cookie = await this.cookiesModel.findOne({
        where: { user_id: user.id },
      });
      if (cookie) {
        await cookie.update({
          cookie: cookieValue,
          expires,
        });
      } else {
        await this.cookiesModel.create({
          user_id: user.id,
          cookie: cookieValue,
          expires,
        });
      }

      ctx.status = 200;
    } else {
      // 账号密码错误，登录失败
      ctx.throw(403);
    }
  }

  async logout() {}
}

module.exports = UserService;
