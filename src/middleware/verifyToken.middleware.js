const jwt = require('../utils/jwt');
const encryptPwd = require('../utils/encryptPwd');
const loginService = require('../service/login.service.js');

async function verifyTokenMiddleware(ctx, next) {
  const header = ctx.header;
  const authorization = header?.authorization?.replace('Bearer ', '');
  // 1.没有token
  if (!authorization) {
    ctx.body = {
      status: 401,
      message: '无效token',
      data: null,
    };
  } else {
    //2.有token
    // 2.1  解析token --> account, password
    let date = jwt.verify(authorization);

    if (!date) {
      ctx.body = {
        status: 403,
        message: 'invalid signature',
      };
      return;
    }

    let result = await loginService.login(date?.account, date?.password);
    // 2.2  token验证成功
    if (result && result.account == date.account && result.password == encryptPwd(date.password)) {
      await next();
    } else {
      // 2.3  token验证失败
      ctx.body = {
        status: 402,
        message: 'token过期',
        data: null,
      };
    }
  }
}

module.exports = verifyTokenMiddleware;
