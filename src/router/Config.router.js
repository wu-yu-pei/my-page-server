const koaRouter = require('koa-router');
const ConfigRouter = new koaRouter();
const verifyTokenMiddleware = require('../middleware/verifyToken.middleware');
const ConfigController = require('../controller/getConfig.controller');

ConfigRouter.get('/config', verifyTokenMiddleware, ConfigController.config);

module.exports = ConfigRouter;
