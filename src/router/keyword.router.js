const koaRouter = require('koa-router');

const keyWordRouter = new koaRouter();
const keyWordController = require('../controller/keyword.controller')

keyWordRouter.get('/keyword', keyWordController.keyword)

module.exports = keyWordRouter