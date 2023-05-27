"use strict";

const Service = require("egg").Service;

class UserService extends Service {
  get userModel() {
    return this.app.model.User;
  }

  async login() {
    const { ctx } = this;
    const id = 1;
    const user = await this.userModel.findOne({
      where: {
        id,
      },
    });
    return user;
  }
}

module.exports = UserService;
