const koaRouter = require('koa-router');
const hasUserMiddleware = require('../middleware/hasUser.middleware');
const loginController = require('../controller/login.controller');
const loginRouter = new koaRouter();

loginRouter.post('/login', hasUserMiddleware, loginController.login);

module.exports = loginRouter;
