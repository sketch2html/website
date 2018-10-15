/**
 * Created by army8735 on 2017/11/28.
 */

'use strict';

module.exports = () => {
  return async function(ctx, next) {
    let origin = ctx.request.header.origin;
    let allowOrigin;
    if(origin && origin.indexOf('circling.cc') > -1) {
      allowOrigin = origin;
    }
    if(allowOrigin) {
      ctx.set('Access-Control-Allow-Origin', allowOrigin);
      ctx.set('Access-Control-Allow-Credentials', 'true');
      ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
    }
    await next();
  }
};
