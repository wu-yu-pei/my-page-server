const Koa = require('koa');

const https = require('https');
const fs = require('fs');
const path = require('path');

const sequelize = require('../database/index');
const redis = require('../database/redis');

const setupMiddleware = require('./useMiddleware');
const setupRouter = require('./useRouter');
const setupSocketIo = require('./useSocketIo')

const app = new Koa();

// setup https
const options = {
  key: fs.readFileSync(path.join(__dirname, '../config/https/7892505_wuyupei.top.key')),
  cert:fs.readFileSync(path.join(__dirname, '../config/https/7892505_wuyupei.top.pem')),
};
const server = https.createServer(options, app.callback());

setupMiddleware(app)

setupRouter(app)

setupSocketIo(server)

module.exports = function (port) {
  // run
  server.listen(port, () => {
    console.log('server is runing');
  });
};
