const User = require('../module/user.module');
const encryptPwd = require('../utils/encryptPwd');
class registerServece {
  constructor() {}

  async register(account, password, mail) {
    let { dataValues } = await User.create({ account, password: encryptPwd(password), mail });
    return dataValues;
  }
}

module.exports = new registerServece();
