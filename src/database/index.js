const { Sequelize } = require('sequelize');
const { DB, USER, PASSWORD, HOST, DIALECT } = require('../config/index');
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log('数据库链接成功....');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
