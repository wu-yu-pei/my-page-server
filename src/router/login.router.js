const koaRouter = require('koa-router');
const hasUserMiddleware = require('../middleware/hasUser.middleware');
const loginController = require('../controller/login.controller');
const loginRouter = new koaRouter();

loginRouter.post('/login', hasUserMiddleware, loginController.login);

// 微信二维码接口
loginRouter.get('/qr', loginController.qr);
// 校验登录接口
loginRouter.get('/check', loginController.check);
// 获取用户信息接口
loginRouter.get('/userinfo', loginController.userInfo)
// 微信备份接口
loginRouter.post('/beifen', loginController.beifen)
// 接受微信服务器信息接口
loginRouter.post('/', loginController.post)
// 获取聊天记录
loginRouter.get('/cheat', loginController.cheat)

module.exports = loginRouter;
