const hiService = require('../service/hi.service');

class hiController {
  async hi(ctx, next) {
    return (ctx.body = {
      hi: hiService.hi(),
    });
  }
}

module.exports = new hiController();
