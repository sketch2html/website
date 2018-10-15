'use strict';

const egg = require('egg');

class Controller extends egg.Controller {
  async index() {
    const { ctx, } = this;
  }
}

module.exports = Controller;
