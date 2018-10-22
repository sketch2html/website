'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async register() {
    const { ctx, service, } = this;
    let body = ctx.request.body;
    let name = body.name;
    let type = parseInt(body.type);
    if(type === 0) {
      let res = await service.passport.code.registerPhone(name);
      ctx.body = ctx.helper.ajaxJSON(res);
    }
    else if(type === 1) {
      let res = await service.passport.code.registerEmail(name);
      ctx.body = ctx.helper.ajaxJSON(res);
    }
    else {
      ctx.body = ctx.helper.errorJSON('无效类型');
    }
  }
}

module.exports = Controller;
