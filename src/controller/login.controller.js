const redis = require('../database/redis');
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

  async userInfo(ctx, next) {
    const { userId } = ctx.request.query
    const res = await loginService.userInfo(userId)
    ctx.body = res
  }

  async beifen(ctx, next) {
    const data = ctx.request.body
    const res = await loginService.beifen(data)
    ctx.body = res
  }

  async cheat(ctx, next) {
    let res = await redis.lrange('mylist', 0, -1)

    const result = res.map(item => JSON.parse(item))

    ctx.body = result
  }
}

module.exports = new registerController();
