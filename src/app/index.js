const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const koaBody = require('koa-body');
const cors = require('cors');

const app = new Koa();

// database
const sequelize = require('../database/index');
// router
const hiRouter = require('../router/hi.router');
const regesterRouter = require('../router/register.router');
const loginRouter = require('../router/login.router');
const configRouter = require('../router/Config.router');
const uploadRouter = require('../router/upload.router');
const captchaRouter = require('../router/captcha.router');

// middlire
app.use(static(path.resolve(__dirname, '../../static/upload')));
app.use(cors());
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

// use router
app.use(hiRouter.routes());
app.use(regesterRouter.routes());
app.use(loginRouter.routes());
app.use(configRouter.routes());
app.use(uploadRouter.routes());
app.use(captchaRouter.routes());

module.exports = function (port) {
  app.listen(port, () => {
    console.log('server is runing');
  });
};
