const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const User = sequelize.define('User', {
  openId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userImg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync({ alter: true });

module.exports = User