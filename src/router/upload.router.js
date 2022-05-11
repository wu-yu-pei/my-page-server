const koaRouter = require('koa-router');
const uploadController = require('../controller/upload.controller');
const uploadRouter = new koaRouter();
const verifyTokenMiddleware = require('../middleware/verifyToken.middleware');

uploadRouter.post('/upload', verifyTokenMiddleware, uploadController.upload);

module.exports = uploadRouter;
