"use strict";

const Service = require("egg").Service;
const dayjs = require("dayjs");
const { v4: uuid } = require("uuid");

class UserService extends Service {
  get usersModel() {
    return this.app.model.Users;
  }

  get passwordsModel() {
    return this.app.model.Passwords;
  }

  get cookiesModel() {
    return this.app.model.Cookies;
  }

  async create(params) {
    const { ctx } = this;
    // 权限校验
    const role = ctx.state.user.role;
    const safeRoles = ["admin"];
    if (!safeRoles.includes(role)) {
      ctx.throw(403, "无权限");
    }
    // 账号判重
    const existingUser = await this.usersModel.findOne({
      where: {
        account: params.account,
      },
    });
    if (existingUser) {
      ctx.throw(422, "账号已存在");
    } else {
      let transaction = null;
      try {
        transaction = await this.ctx.model.transaction();

        // 创建账号
        await this.usersModel.create(params, { transaction });

        // 获取创建账号结果
        const user = await this.usersModel.findOne({
          where: {
            account: params.account,
          },
          transaction,
        });

        // 创建密码
        await this.passwordsModel.create(
          {
            user_id: user.id,
            password: "1",
          },
          { transaction }
        );

        await transaction.commit();

        ctx.status = 200;
      } catch (error) {
        await transaction.rollback();
        ctx.throw(500);
      }
    }
  }

  async update() {
    return "update";
  }

  async list() {
    return "list";
  }

  async info() {
    const { ctx } = this;
    return ctx.state.user;
  }

  async login(params) {
    const { ctx } = this;
    let user, password;
    user = await this.usersModel.findOne({
      where: {
        account: params.account,
      },
    });
    if (user) {
      password = await this.passwordsModel.findOne({
        where: {
          user_id: user.id,
          password: params.password,
        },
      });
    }

    const isValid = !!user && !!password;

    if (isValid) {
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
      ctx.throw(403, "账号密码错误");
    }
  }

  async logout() {
    return "logout";
  }

  async delete() {
    return "delete";
  }
}

module.exports = UserService;
