const koaRouter = require('koa-router');
const uploadController = require('../controller/upload.controller');
const uploadRouter = new koaRouter();

uploadRouter.post('/upload', uploadController.upload);

module.exports = uploadRouter;
