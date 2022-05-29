const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const koaBody = require('koa-body');
const cors = require('koa-cors');
const http = require('http');
// database
const sequelize = require('../database/index');
// redis
const redis = require('../database/redis')

const app = new Koa();
const server = http.createServer(app.callback());

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST']
  }
});

io.on('connect', (socket) => {
  socket.on('message', async (data) => {
    await redis.rpush("mylist", JSON.stringify(data))
    socket.broadcast.emit("guangbo", data);
  })
})


// router
const hiRouter = require('../router/hi.router');
const uploadRouter = require('../router/upload.router');
const keyWordRouter = require('../router/keyword.router');
const regesterRouter = require('../router/register.router');
const loginRouter = require('../router/login.router');

// middlire
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
// use router
app.use(hiRouter.routes());
app.use(uploadRouter.routes());
app.use(keyWordRouter.routes())
app.use(regesterRouter.routes());
app.use(loginRouter.routes());


module.exports = function (port) {
  server.listen(port, () => {
    console.log('server is runing');
  });
};
