"use strict";

const { Controller } = require("egg");

class UserController extends Controller {
  get userService() {
    return this.ctx.service.user;
  }

  async login() {
    const { ctx } = this;
    const res = await this.userService.login();
    ctx.body = res;
  }
}

module.exports = UserController;
