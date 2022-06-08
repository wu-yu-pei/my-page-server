module.exports = function (app) {
  // router
  const hiRouter = require('../router/hi.router');
  const uploadRouter = require('../router/upload.router');
  const keyWordRouter = require('../router/keyword.router');
  const regesterRouter = require('../router/register.router');
  const loginRouter = require('../router/login.router');


  // use router
  app.use(hiRouter.routes());
  app.use(uploadRouter.routes());
  app.use(keyWordRouter.routes())
  app.use(regesterRouter.routes());
  app.use(loginRouter.routes());
}