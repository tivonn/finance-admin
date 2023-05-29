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

  async login() {
    const { ctx } = this;
    ctx.validate(loginRules, ctx.request.body);
    const res = await this.userService.login(ctx.request.body);
    ctx.body = res;
  }

  async logout() {
    const { ctx } = this;
    const res = await this.userService.logout();
    ctx.body = res;
  }
}

module.exports = UserController;
