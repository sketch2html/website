'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('layout_index', {});
  }

  async basic() {
    const { ctx } = this;
    await ctx.render('layout_basic', {
    });
  }

  async row() {
    const { ctx } = this;
    await ctx.render('layout_row', {
    });
  }

  async col() {
    const { ctx } = this;
    await ctx.render('layout_col', {
    });
  }

  async junior() {
    const { ctx } = this;
    await ctx.render('layout_junior', {
    });
  }

  async flexRowRatio() {
    const { ctx } = this;
    await ctx.render('layout_flex_row_ratio', {
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

  async rowView() {
    const { ctx, app } = this;
    let id = parseInt(ctx.params.id);
    if(!id) {
      return;
    }
    let res = await app.model.layout.Row.findOne({
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
    await ctx.render('layout_row_view', {
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
        'row',
        'col',
        'direction',
        'area',
        'directions',
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
}

module.exports = Controller;
