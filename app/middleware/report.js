/**
 * Created by army8735 on 2017/10/13.
 */

'use strict';

module.exports = () => {
  return async function(ctx, next) {
    let start = Date.now();
    await next();
    let end = Date.now();
    let ip = ctx.request.header['x-real-ip'];
    let uid = ctx.session ? ctx.session.uid || '-' : '-';
    let method = ctx.request.method;
    let url = ctx.request.url;
    ctx.app.logger.info('[%s/%s/%s/%sms %s %s]', uid, ip, ctx.tranceId, end - start, method, url);
  };
};
