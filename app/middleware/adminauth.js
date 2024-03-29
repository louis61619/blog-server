'use strict';

module.exports = () => {
  return async function adminauth(ctx, next) {
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { data: 'is not login' };
    }
  };
};
