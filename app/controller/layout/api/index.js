'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async d1() {
    const { ctx, app } = this;
    let body = ctx.request.body;
    let list = body.list;
    let classify = body.classify;
    let direction = body.direction;
    let num = body.num;
    if(!list || isNaN(classify) || !num || !direction) {
      ctx.body = ctx.helper.errorJSON('无效参数');
    }
    let res = await app.model.layout.Basic.create({
      data: list,
      classify,
      direction,
      num,
    }, {
      raw: true,
    });
    ctx.body = ctx.helper.okJSON(res);
  }

  async d2_2() {
    const { ctx, app } = this;
    let body = ctx.request.body;
    let list = body.list;
    let classify = body.classify;
    let num = body.num;
    if(!list || !num) {
      ctx.body = ctx.helper.errorJSON('无效参数');
    }
    let res = await app.model.layout.Junior.create({
      data: list,
      classify,
      col: 2,
      row: 2,
      num,
    }, {
      raw: true,
    });
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
