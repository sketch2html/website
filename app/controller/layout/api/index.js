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
    if(!list || isNaN(classify) || !num || !direction || !classify) {
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
    if(!list || !row || !col || !classify) {
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
    if(!list || !row || !col || !classify) {
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

  async junior() {
    const { ctx, app } = this;
    let body = ctx.request.body;
    let list = body.list;
    let classify = body.classify;
    let row = body.row;
    let col = body.col;
    let area = body.area;
    let direction = body.direction;
    let directions = body.directions;
    if(!list || !row || !col || !area || !direction || !classify) {
      ctx.body = ctx.helper.errorJSON('无效参数');
    }
    let res = await app.model.layout.Junior.create({
      data: list,
      classify,
      row,
      col,
      area,
      direction,
      directions,
    }, {
      raw: true,
    });
    ctx.body = ctx.helper.okJSON(res);
  }

  async flexRowRatio() {
    const { ctx, app } = this;
    let body = ctx.request.body;
    let classify = body.classify;
    let w1 = body.w1;
    let w2 = body.w2;
    let space = body.space;
    if(!w1 || !w2 || !space || !classify) {
      ctx.body = ctx.helper.errorJSON('无效参数');
    }
    let res = await app.model.layout.FlexRowRatio.create({
      classify,
      w1,
      w2,
      space,
    }, {
      raw: true,
    });
    ctx.body = ctx.helper.okJSON(res);
  }
}

module.exports = Controller;
