'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/ssl')(app);
  require('./router/default')(app);
  require('./router/admin')(app);
  require('./router/user')(app);
};
