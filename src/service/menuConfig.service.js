const configModule = require('../module/config.module');
const { searchConfig, menuConfig } = require('../config/client.js');

class ConfigService {
  constructor() {}

  async getAllconfig(account) {
    const res = await configModule.findOne({
      where: {
        account,
      },
    });
    return res;
  }

  async createDefault(id, account) {
    await configModule.create({
      UserId: id,
      account: account,
      searchconfig: JSON.stringify(searchConfig),
      menuconfig: JSON.stringify(menuConfig),
    });
  }
}

module.exports = new ConfigService();
