/**
 * Created by army8735 on 2017/10/8.
 */

'use strict';

module.exports = () => {
  return async function(ctx, next) {
    let admin = await ctx.service.user.user.admin(ctx.session.uid);
    if(!admin) {
      return ctx.body = {
        success: false,
        code: 1001,
        message: '暂无权限',
      };
    }
    await next();
  };
};
