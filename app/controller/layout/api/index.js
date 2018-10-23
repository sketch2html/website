'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async gen() {
    const { ctx, app } = this;
    let body = ctx.request.body;
    let list = body.list;
    let type = body.type;
    let col = body.col;
    let row = body.row;
    let num = body.num;
    if(!list || !col || !row || !num) {
      ctx.body = ctx.helper.errorJSON('无效参数');
    }
    if(type === true || type === false) {
      let res = await app.model.layout.Basic.create({
        data: list,
        type,
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
