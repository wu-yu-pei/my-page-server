const User = require('../module/user.module');
const encryptPwd = require('../utils/encryptPwd');
class loginService {
  constructor() {}
  async login(account, password) {
    let result = await User.findOne({
      where: {
        account,
        password: encryptPwd(password),
      },
    });
    return result?.dataValues;
  }
}

module.exports = new loginService();
