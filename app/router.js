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
  router.get('/layout/1', app.middlewares.needLogin(), app.middlewares.needAdmin(), controller.layout.index.d1);
  router.get('/layout/2_2', app.middlewares.needLogin(), app.middlewares.needAdmin(), controller.layout.index.d2_2);
  router.get('/layout/row', app.middlewares.needLogin(), app.middlewares.needAdmin(), controller.layout.index.row);
  router.get('/layout/col', app.middlewares.needLogin(), app.middlewares.needAdmin(), controller.layout.index.col);
  router.get('/layout/2_3_6', app.middlewares.needLogin(), app.middlewares.needAdmin(), controller.layout.index.d2_3_6);
  router.post('/layout/api/1', app.middlewares.needLoginJson(), app.middlewares.needAdminJson(), controller.layout.api.index.d1);
  router.post('/layout/api/2_2', app.middlewares.needLoginJson(), app.middlewares.needAdminJson(), controller.layout.api.index.d2_2);
  router.post('/layout/api/row', app.middlewares.needLoginJson(), app.middlewares.needAdminJson(), controller.layout.api.index.row);
  router.post('/layout/api/col', app.middlewares.needLoginJson(), app.middlewares.needAdminJson(), controller.layout.api.index.col);
  router.get('/layout/view/basic/:id', app.middlewares.needLogin(), app.middlewares.needAdmin(), controller.layout.index.basicView);
  router.get('/layout/view/junior/:id', app.middlewares.needLogin(), app.middlewares.needAdmin(), controller.layout.index.juniorView);
  router.get('/layout/view/row/:id', app.middlewares.needLogin(), app.middlewares.needAdmin(), controller.layout.index.rowView);
  router.get('/layout/view/col/:id', app.middlewares.needLogin(), app.middlewares.needAdmin(), controller.layout.index.colView);
};
