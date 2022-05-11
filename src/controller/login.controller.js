const loginService = require('../service/login.service');
const jwt = require('../utils/jwt');
class registerController {
  async login(ctx, next) {
    const { account, password } = ctx.request.body;
    let res = await loginService.login(account, password);
    if (!res) {
      ctx.body = {
        status: '401',
        messag: '密码错误',
        data: null,
      };
      await next();
    } else {
      ctx.body = {
        status: 200,
        messag: '登录成功',
        data: {
          account,
          token: jwt.sign({ account, password }),
        },
      };
    }
  }
}

module.exports = new registerController();
