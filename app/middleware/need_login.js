'use strict';

module.exports = () => {
  return async function(ctx, next) {
    if(!ctx.session.uid) {
      let goto = ctx.query.goto;
      let redirect = ctx.app.config.hostPassport + '/login' + (goto ? '?goto=' + encodeURIComponent(goto) : '');
      return ctx.redirect(redirect);
    }
    await next();
  };
};
