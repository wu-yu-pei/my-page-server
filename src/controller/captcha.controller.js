const svgCaptcha = require('svg-captcha');

class captchaController {
  async code(ctx, next) {
    const captcha = svgCaptcha.create();
    // ctx.setCookie();
    ctx.cookies.set('code', captcha.text, {
      maxAge: 60 * 1000, //设置过期时间，
      httpOnly: false, // 客户端可以访问到
    });
    return (ctx.body = {
      code: captcha.data,
    });
    next();
  }
}

module.exports = new captchaController();
