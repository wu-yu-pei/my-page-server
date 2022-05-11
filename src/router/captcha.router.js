const koaRouter = require('koa-router');
const captchaRouter = new koaRouter();
const verifyTokenMiddleware = require('../middleware/verifyToken.middleware');

const captchaController = require('../controller/captcha.controller');

captchaRouter.get('/code', verifyTokenMiddleware, captchaController.code);

module.exports = captchaRouter;
