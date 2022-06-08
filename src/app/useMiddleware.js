const static = require('koa-static');
const koaBody = require('koa-body');
const cors = require('koa-cors');
const sslify = require('koa-sslify').default;
const path = require('path');

module.exports = function (app) {
  // middlire
  app.use(sslify());
  app.use(cors());
  app.use(static(path.resolve(__dirname, '../../static')));
  app.use(
    koaBody({
      // 支持文件格式
      multipart: true,
      formidable: {
        // 上传目录
        uploadDir: path.join(__dirname, '../../static/upload'),
        // 保留文件扩展名
        keepExtensions: true,
      },
    })
  );
}