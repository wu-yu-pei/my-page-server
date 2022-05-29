const hiService = require('../service/hi.service');

class hiController {
  async hi(ctx, next) {
    const res = await hiService.hi(ctx)
    ctx.body = res
  }
}

module.exports = new hiController();
