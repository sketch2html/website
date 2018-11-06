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

  router.get('/layout', app.middlewares.needLogin(), app.middlewares.needAdmin(), controller.layout.index.index);
  router.get('/layout/2_2_3', app.middlewares.needLogin(), app.middlewares.needAdmin(), controller.layout.index.d2_2_3);
  router.get('/layout/2_2_4', app.middlewares.needLogin(), app.middlewares.needAdmin(), controller.layout.index.d2_2_4);
  router.get('/layout/2_3_6', app.middlewares.needLogin(), app.middlewares.needAdmin(), controller.layout.index.d2_3_6);
  router.post('/layout/api/gen', app.middlewares.needLoginJson(), app.middlewares.needAdminJson(), controller.layout.api.index.gen);
  router.get('/layout/view/:id', app.middlewares.needLogin(), app.middlewares.needAdmin(), controller.layout.index.view);
};
