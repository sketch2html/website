/**
 * Created by army8735 on 2017/10/7.
 */

'use strict';

module.exports = () => {
  return async function(ctx, next) {
    let helper = ctx.helper;
    if(ctx.session.uid) {
      helper.$CONFIG += `
  $CONFIG.isLogin = true;
  $CONFIG.uid = '${ctx.session.uid}';
  $CONFIG.nickname = '${ctx.session.nickname}';`;
    }
    await next();
  };
};
