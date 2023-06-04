"use strict";

const { Controller } = require("egg");

const createUserRules = {
  account: {
    type: "string",
    required: true,
    format: /^[a-zA-Z0-9_]{6,20}$/,
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
  phone_number: {
    type: "string",
    required: true,
    format: /^[\d\-+]{7,20}$/,
  },
};

const updateUserRules = Object.assign({}, createUserRules, {
  id: {
    type: "number",
    required: true,
  },
});

const getUsersRules = {
  page_index: {
    type: "number",
    required: true,
  },
  page_size: {
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

const deleteUserRules = {
  id: {
    type: "number",
    required: true,
  },
};

class UserController extends Controller {
  get userService() {
    return this.ctx.service.user;
  }

  // 创建用户
  async createUser() {
    const { ctx } = this;
    const params = ctx.helper.filterParams(
      createUserRules,
      Object.assign({}, ctx.request.body)
    );
    ctx.validate(createUserRules, params);
    const res = await this.userService.createUser(params);
    ctx.body = res;
  }

  // 修改用户
  async updateUser() {
    const { ctx } = this;
    const params = ctx.helper.filterParams(
      updateUserRules,
      Object.assign({}, ctx.params, ctx.request.body)
    );
    ctx.validate(updateUserRules, params);
    const res = await this.userService.updateUser(params);
    ctx.body = res;
  }

  // 获取用户列表
  async getUsers() {
    const { ctx } = this;
    const params = ctx.helper.filterParams(
      getUsersRules,
      Object.assign({}, ctx.request.body)
    );
    ctx.validate(getUsersRules, params);
    const res = await this.userService.getUsers(params);
    ctx.body = res;
  }

  // 获取用户信息
  async getUserInfo() {
    const { ctx } = this;
    const res = await this.userService.getUserInfo();
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
  async deleteUser() {
    const { ctx } = this;
    const params = ctx.helper.filterParams(
      deleteUserRules,
      Object.assign({}, ctx.params)
    );
    ctx.validate(deleteUserRules, params);
    const res = await this.userService.deleteUser(params);
    ctx.body = res;
  }
}

module.exports = UserController;
