'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('layout_index', {});
  }

  async d2_2_3() {
    const { ctx } = this;
    await ctx.render('layout_detail', {
      col: 2,
      row: 2,
      num: 3,
    });
  }
}

module.exports = Controller;
