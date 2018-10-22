'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('passport_index', {});
  }

  async login() {
    const { ctx } = this;
    await ctx.render('passport_login', {});
  }

  async register() {
    const { ctx } = this;
    await ctx.render('passport_register', {});
  }

  async exit() {
    const { ctx, app } = this;
    ctx.session = null;
    ctx.redirect(app.config.host);
  }
}

module.exports = Controller;
