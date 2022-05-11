const User = require('../module/user.module');
const encryptPwd = require('../utils/encryptPwd');
async function hasExist(ctx, next) {
  const account = ctx.request.body.account;
  const password = ctx.request.body.password;
  if (!account || !password) {
    ctx.body = {
      status: 2001,
      message: '字段错误',
      data: null,
    };
    return;
  }
  let result = await User.findAll({
    where: {
      account,
    },
  });
  if (result.length === 0) {
    await next();
  } else {
    ctx.body = {
      code: 210,
      message: '用户名已存在',
    };
  }
}

module.exports = hasExist;
