const ConfigService = require('../service/menuConfig.service');

class ConfigController {
  async config(ctx, next) {
    const { account } = ctx.query;

    const res = await ConfigService.getAllconfig(account);

    ctx.body = {
      bg: res.bg,
      searchconfig: JSON.parse(res.searchconfig),
      menuconfig: JSON.parse(res.menuconfig),
      blur: res.blur,
      radius: res.radius,
    };
    next();
  }
}

module.exports = new ConfigController();
