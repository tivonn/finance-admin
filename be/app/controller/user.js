"use strict";

const { Controller } = require("egg");

const loginRules = {
  account: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
};

class UserController extends Controller {
  get userService() {
    return this.ctx.service.user;
  }

  // 创建用户
  async create() {
    const { ctx } = this;
    const res = await this.userService.create();
    ctx.body = res;
  }

  // 修改用户
  async update() {
    const { ctx } = this;
    const res = await this.userService.update();
    ctx.body = res;
  }

  // 获取用户列表
  async list() {
    const { ctx } = this;
    // const res = await this.userService.list();
    // ctx.body = res;

    ctx.body = {
      total: 55,
      data: [
        {
          id: 1,
          username: "1",
          account: "111",
          role: "admin",
        },
        {
          id: 2,
          username: "2",
          account: "222",
          role: "staff",
        },
        {
          id: 3,
          username: "3",
          account: "333",
          role: "finance",
        },
        {
          id: 4,
          username: "4",
          account: "444",
          role: "user",
        },
        {
          id: 5,
          username: "1",
          account: "111",
          role: "admin",
        },
        {
          id: 6,
          username: "2",
          account: "222",
          role: "staff",
        },
        {
          id: 7,
          username: "3",
          account: "333",
          role: "finance",
        },
        {
          id: 8,
          username: "4",
          account: "444",
          role: "user",
        },
        {
          id: 9,
          username: "1",
          account: "111",
          role: "admin",
        },
        {
          id: 10,
          username: "2",
          account: "222",
          role: "staff",
        },
      ],
    };
  }

  // 获取用户信息
  async info() {
    const { ctx } = this;
    const res = await this.userService.info();
    ctx.body = res;
  }

  // 登录
  async login() {
    const { ctx } = this;
    ctx.validate(loginRules, ctx.request.body);
    const res = await this.userService.login(ctx.request.body);
    ctx.body = res;
  }

  // 登出
  async logout() {
    const { ctx } = this;
    const res = await this.userService.logout();
    ctx.body = res;
  }

  // 删除用户
  async delete() {
    const { ctx } = this;
    const res = await this.userService.delete();
    ctx.body = res;
  }
}

module.exports = UserController;
