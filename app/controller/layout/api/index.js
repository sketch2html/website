'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async basic() {
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

  async row() {
    const { ctx, app } = this;
    let body = ctx.request.body;
    let list = body.list;
    let classify = body.classify;
    let row = body.row;
    let col = body.col;
    if(!list || !col) {
      ctx.body = ctx.helper.errorJSON('无效参数');
    }
    let res = await app.model.layout.Row.create({
      data: list,
      classify,
      row,
      col,
    }, {
      raw: true,
    });
    ctx.body = ctx.helper.okJSON(res);
  }

  async col() {
    const { ctx, app } = this;
    let body = ctx.request.body;
    let list = body.list;
    let classify = body.classify;
    let row = body.row;
    let col = body.col;
    if(!list || !col) {
      ctx.body = ctx.helper.errorJSON('无效参数');
    }
    let res = await app.model.layout.Col.create({
      data: list,
      classify,
      row,
      col,
    }, {
      raw: true,
    });
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
