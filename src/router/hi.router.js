const koaRouter = require('koa-router');
const hiRouter = new koaRouter();

const hiController = require('../controller/hi.controller');

hiRouter.get('/', hiController.hi);

module.exports = hiRouter;
