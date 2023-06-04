"use strict";

const Service = require("egg").Service;
const dayjs = require("dayjs");
const { v4: uuid } = require("uuid");
const md5 = require("md5");

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

  async createUser(params) {
    const { ctx } = this;
    // 权限校验
    const safeRoles = ["admin"];
    if (!safeRoles.includes(ctx.state.user.role)) {
      ctx.throw(403, "无权限");
    }
    // 业务逻辑
    // 账号判重
    const existingUser = await this.usersModel.findOne({
      where: {
        account: params.account,
      },
    });
    if (existingUser) {
      ctx.throw(422, "账号已存在");
    } else {
      let createUserTransaction = null;
      try {
        // 创建用户事务
        createUserTransaction = await this.ctx.model.transaction();

        // 创建用户
        await this.usersModel.create(params, {
          transaction: createUserTransaction,
        });

        // 获取创建用户结果
        const user = await this.usersModel.findOne({
          where: {
            account: params.account,
          },
          transaction: createUserTransaction,
        });

        // 创建密码
        const salt = uuid();
        const defaultPassword = params.phone_number;
        const password = md5(defaultPassword + salt);
        await this.passwordsModel.create(
          {
            user_id: user.id,
            password,
            salt,
          },
          { transaction: createUserTransaction }
        );

        await createUserTransaction.commit();

        ctx.status = 200;
      } catch (error) {
        await createUserTransaction.rollback();
        ctx.throw(500);
      }
    }
  }

  async updateUser(params) {
    const { ctx } = this;
    // 权限校验
    const safeRoles = ["admin"];
    if (!safeRoles.includes(ctx.state.user.role)) {
      ctx.throw(403, "无权限");
    }
    // 业务逻辑
    const { id } = params;
    const user = await this.usersModel.findOne({
      where: {
        id,
      },
    });
    // 未找到数据
    if (!user || user.is_delete) {
      ctx.throw(404, "不存在该用户");
    }
    // 校验不可修改项
    if (user.account !== params.account) {
      ctx.throw(422, "账号不可修改");
    }
    // 更新数据
    await user.update(params);

    ctx.status = 200;
  }

  async getUsers(params) {
    const { ctx, app } = this;
    // 权限校验
    const safeRoles = ["admin"];
    if (!safeRoles.includes(ctx.state.user.role)) {
      ctx.throw(403, "无权限");
    }
    // 业务逻辑
    // 查询数据
    const { Op } = app.Sequelize;
    const users = await this.usersModel.findAndCountAll({
      where: Object.assign(
        {},
        {
          is_delete: false,
        },
        params.username
          ? {
              username: {
                [Op.like]: `%${params.username}%`,
              },
            }
          : {},
        params.role
          ? {
              role: {
                [Op.in]: params.role,
              },
            }
          : {}
      ),
      ...ctx.helper.getPageParams(params.page_index, params.page_size),
      // 过滤返回数据
      attributes: {
        exclude: ["is_delete", "create_at", "update_at"],
      },
    });
    return users;
  }

  async getUserInfo() {
    const { ctx } = this;
    return ctx.state.user;
  }

  async login(params) {
    const { ctx } = this;
    let user, password;
    let isUserValid = false;
    let isPasswordValid = false;
    user = await this.usersModel.findOne({
      where: {
        account: params.account,
        is_delete: false,
      },
    });
    isUserValid = !!user;
    if (isUserValid) {
      password = await this.passwordsModel.findOne({
        where: {
          user_id: user.id,
        },
      });
      if (password) {
        isPasswordValid =
          md5(params.password + password.salt) === password.password;
      }
    }
    const isValid = isUserValid && isPasswordValid;
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
    const { ctx } = this;
    // 更新用户 cookie 过期时间
    const cookie = await this.cookiesModel.findOne({
      where: { user_id: ctx.state.user.id },
    });
    if (cookie) {
      // 浏览器更新
      ctx.cookies.set("cookie", null);
      // 数据库更新
      await cookie.destroy();

      ctx.throw(401);
    } else {
      ctx.throw(401);
    }
  }

  async deleteUser(params) {
    const { ctx } = this;
    // 权限校验
    const safeRoles = ["admin"];
    if (!safeRoles.includes(ctx.state.user.role)) {
      ctx.throw(403, "无权限");
    }
    // 业务逻辑
    const user = await this.usersModel.findOne({
      where: {
        id: params.id,
      },
    });
    if (!user) {
      ctx.throw(404, "不存在该用户");
    }
    // 校验不可删除项
    if (user.id === ctx.state.user.id) {
      ctx.throw(422, "不可删除当前用户");
    }
    // 删除数据
    let deleteUserTransaction = null;
    try {
      // 删除用户事务
      deleteUserTransaction = await this.ctx.model.transaction();

      // 更新用户状态
      await user.update(
        {
          is_delete: 1,
        },
        { transaction: deleteUserTransaction }
      );

      // 更新用户 cookie 过期时间
      const cookie = await this.cookiesModel.findOne({
        where: { user_id: user.id },
        transaction: deleteUserTransaction,
      });
      if (cookie) {
        await cookie.destroy({ transaction: deleteUserTransaction });
      }

      await deleteUserTransaction.commit();

      ctx.status = 200;
    } catch (error) {
      await deleteUserTransaction.rollback();
      ctx.throw(500);
    }

    ctx.status = 200;
  }
}

module.exports = UserService;
