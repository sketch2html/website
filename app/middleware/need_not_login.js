'use strict';

module.exports = () => {
  return async function(ctx, next) {
    if(ctx.session.uid) {
      return ctx.redirect(ctx.app.config.host);
    }
    await next();
  };
};
