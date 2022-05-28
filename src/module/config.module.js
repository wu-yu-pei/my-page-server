const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const UserConfig = sequelize.define('UserConfig', {
  openId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bgImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blur: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  redius: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  menu: {
    type: DataTypes.JSON,
    allowNull: false,
  }
});

UserConfig.sync({ alter: true });

module.exports = UserConfig