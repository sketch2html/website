'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async login() {
    const { ctx, service, } = this;
    let body = ctx.request.body;
    let name = body.name;
    let password = body.password;
    let remember = body.remember === true;
    if(!name || !password) {
      return ctx.body = ctx.helper.errorJSON('请输入用户名和密码');
    }
    if(/^1\d{10}$/.test(name)) {
      let res = await service.passport.account.loginPhone(name, password, remember);
      ctx.body = ctx.helper.ajaxJSON(res);
    }
    else if(/^[A-Za-z0-9\u4e00-\u9fa5]+@[\w-]+(\.[\w-]+)+$/.test(name)) {
      let res = await service.passport.account.loginEmail(name, password, remember);
      ctx.body = ctx.helper.ajaxJSON(res);
    }
    else {
      let res = await service.passport.account.login(name, password, remember);
      ctx.body = ctx.helper.ajaxJSON(res);
    }
  }

  async exist() {
    const { ctx, } = this;
    ctx.session = null;
    ctx.body = ctx.helper.okJSON();
  }

  async register() {
    const { ctx, service, } = this;
    let body = ctx.request.body;
    let name = body.name;
    let password = body.password;
    let code = body.code;
    let type = parseInt(body.type);
    if(type === 0) {
      let res = await service.passport.account.registerPhone(name, password, code);
      ctx.body = ctx.helper.ajaxJSON(res);
    }
    else if(type === 1) {
      let res = await service.passport.account.registerEmail(name, password, code);
      ctx.body = ctx.helper.ajaxJSON(res);
    }
    else {
      ctx.body = ctx.helper.errorJSON('无效类型');
    }
  }
}

module.exports = Controller;
