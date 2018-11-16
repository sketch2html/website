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

  async col() {
    const { ctx } = this;
    await ctx.render('layout_col', {
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
        'id',
        'data',
        'num',
        'direction',
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
    await ctx.render('layout_basic_view', {
      item: res,
    });
  }

  async juniorView() {
    const { ctx, app } = this;
    let id = parseInt(ctx.params.id);
    if(!id) {
      return;
    }
    let res = await app.model.layout.Junior.findOne({
      attributes: [
        'id',
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
    await ctx.render('layout_junior_view', {
      item: res,
    });
  }

  async colView() {
    const { ctx, app } = this;
    let id = parseInt(ctx.params.id);
    if(!id) {
      return;
    }
    let res = await app.model.layout.Col.findOne({
      attributes: [
        'id',
        'data',
        'row',
        'col',
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
    await ctx.render('layout_col_view', {
      item: res,
    });
  }
}

module.exports = Controller;
