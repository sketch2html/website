'use strict';

module.exports = () => {
  return async function(ctx, next) {
    let admin = await ctx.service.user.user.admin(ctx.session.uid);
    if(!admin) {
      return ctx.redirect(ctx.app.config.host);
    }
    await next();
  };
};
