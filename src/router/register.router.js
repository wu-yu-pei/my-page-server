const koaRouter = require('koa-router');

const registerRouter = new koaRouter();

const registerController = require('../controller/register.controller');
const hasExistMiddleware = require('../middleware/hasExist.middleware');
registerRouter.post('/register', hasExistMiddleware, registerController.register);

module.exports = registerRouter;
