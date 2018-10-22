'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.index.index);

  router.get('/passport', app.middlewares.needNotLogin(), controller.passport.index.index);
  router.get('/passport/login', app.middlewares.needNotLogin(), controller.passport.index.login);
  router.get('/passport/register', app.middlewares.needNotLogin(), controller.passport.index.register);
  router.get('/passport/exit', controller.passport.index.exit);
  router.post('/passport/api/login', app.middlewares.needNotLoginJson(), controller.passport.api.index.login);
  router.post('/passport/api/exist', controller.passport.api.index.exist);
  router.post('/passport/api/register', app.middlewares.needNotLoginJson(), controller.passport.api.index.register);
  router.post('/passport/api/code/register', app.middlewares.needNotLoginJson(), controller.passport.api.code.register);
};
