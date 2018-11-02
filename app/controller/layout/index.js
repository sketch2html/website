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

  async d2_2_4() {
    const { ctx } = this;
    await ctx.render('layout_detail', {
      col: 2,
      row: 2,
      num: 4,
    });
  }

  async view() {
    const { ctx, app } = this;
    let id = parseInt(ctx.params.id);
    if(!id) {
      return;
    }
    let res = await app.model.layout.Basic.findOne({
      attributes: [
        'data',
        'classify'
      ],
      where: {
        id,
      },
      raw: true,
    });
    if(!res) {
      return;
    }
    await ctx.render('layout_view', {
      item: res,
    });
  }

  async preview() {
    const { ctx, app } = this;
    let id = parseInt(ctx.params.id);
    if(!id) {
      return;
    }
    let res = await app.model.layout.Basic.findOne({
      attributes: [
        'data',
        'classify'
      ],
      where: {
        id,
      },
      raw: true,
    });
    if(!res) {
      return;
    }
    await ctx.render('layout_preview', {
      item: res,
    });
  }
}

module.exports = Controller;
