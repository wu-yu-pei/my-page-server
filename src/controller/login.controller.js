const loginService = require('../service/login.service');

class registerController {
  async login(ctx, next) {

  }

  async qr(ctx, next) {
    ctx.body = await loginService.qr()
  }

  async check(ctx, next) {
    const { scene_id } = ctx.request.query
    const res = await loginService.check(scene_id)
    ctx.body = res
  }

  async post(ctx, next) {
    const xml = ctx.request.body

    const res = await loginService.post(xml)

    ctx.body = res
  }
}

module.exports = new registerController();
