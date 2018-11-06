'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async gen() {
    const { ctx, app } = this;
    let body = ctx.request.body;
    let list = body.list;
    let classify = body.classify;
    let col = body.col;
    let row = body.row;
    let num = body.num;
    if(!list || !col || !row || !num) {
      ctx.body = ctx.helper.errorJSON('无效参数');
    }
    if(classify === true || classify === false) {
      let res = await app.model.layout.Junior.create({
        data: list,
        classify,
        col,
        row,
        num,
      }, {
        raw: true,
      });
      ctx.body = ctx.helper.okJSON(res);
    }
    else {
      ctx.body = ctx.helper.errorJSON('无效参数');
    }
  }
}

module.exports = Controller;
