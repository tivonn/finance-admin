"use strict";

const { Controller } = require("egg");

const createRules = {
  account: {
    type: "string",
    required: true,
  },
  username: {
    type: "string",
    required: true,
  },
  role: {
    type: "enum",
    required: true,
    values: ["admin", "finance", "staff", "external"],
  },
};

const getListRules = {
  pageIndex: {
    type: "number",
    required: true,
  },
  pageSize: {
    type: "number",
    required: true,
  },
  username: {
    type: "string",
    required: false,
  },
  role: {
    type: "array",
    itemType: "enum",
    rule: {
      type: "enum",
      required: false,
      values: ["admin", "finance", "staff", "external"],
    },
    required: false,
  },
};

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
    const params = ctx.helper.filterParams(
      createRules,
      Object.assign({}, ctx.request.body)
    );
    ctx.validate(createRules, params);
    const res = await this.userService.create(params);
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
    const params = ctx.helper.filterParams(
      getListRules,
      Object.assign({}, ctx.request.body)
    );
    ctx.validate(getListRules, params);
    const res = await this.userService.list(params);
    ctx.body = res;
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
    const params = ctx.helper.filterParams(
      loginRules,
      Object.assign({}, ctx.request.body)
    );
    ctx.validate(loginRules, params);
    const res = await this.userService.login(params);
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
