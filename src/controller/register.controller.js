const registerServece = require('../service/register.service');
const ConfigService = require('../service/menuConfig.service');

class registerController {
  async register(ctx, next) {
    const { account, password, mail } = ctx.request.body;
    try {
      let result = await registerServece.register(account, password, mail);
      if (result.account == account) {
        // 注册成功
        ctx.body = {
          status: 200,
          message: '注册成功',
        };
        // 给用户设置默认数据
        const { id, account } = result;

        await ConfigService.createDefault(id, account);
        await next();
      } else {
        ctx.body = {
          message: '注册失败',
        };
      }
    } catch (error) {
      ctx.body = {
        error,
      };
    }
  }
}

module.exports = new registerController();
