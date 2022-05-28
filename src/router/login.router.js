const koaRouter = require('koa-router');
const hasUserMiddleware = require('../middleware/hasUser.middleware');
const loginController = require('../controller/login.controller');
const loginRouter = new koaRouter();

loginRouter.post('/login', hasUserMiddleware, loginController.login);

loginRouter.get('/qr', loginController.qr);

loginRouter.get('/check', loginController.check);

loginRouter.get('/userinfo', loginController.userInfo)

loginRouter.post('/beifen', loginController.beifen)

loginRouter.post('/', loginController.post)

module.exports = loginRouter;
