'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('layout_index', {});
  }

  async d1() {
    const { ctx } = this;
    await ctx.render('layout_basic', {
    });
  }

  async d2_2() {
    const { ctx } = this;
    await ctx.render('layout_junior', {
      row: 2,
      col: 2,
    });
  }

  async d2_2_3() {
    const { ctx } = this;
    await ctx.render('layout_junior', {
      row: 2,
      col: 2,
      num: 3,
    });
  }

  async d2_2_4() {
    const { ctx } = this;
    await ctx.render('layout_junior', {
      row: 2,
      col: 2,
      num: 4,
    });
  }

  async d2_3_6() {
    const { ctx } = this;
    await ctx.render('layout_senior', {
      row: 2,
      col: 3,
      num: 6,
    });
  }

  async basicView() {
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

  async view() {
    const { ctx, app } = this;
    let id = parseInt(ctx.params.id);
    if(!id) {
      return;
    }
    let res = await app.model.layout.Junior.findOne({
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
}

module.exports = Controller;
