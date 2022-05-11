const koaRouter = require('koa-router');
const captchaRouter = new koaRouter();

const captchaController = require('../controller/captcha.controller');

captchaRouter.get('/code', captchaController.code);

module.exports = captchaRouter;
