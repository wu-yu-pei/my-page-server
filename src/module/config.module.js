const sequelize = require('../database/index');
const { DataTypes, Model } = require('sequelize');
const User = require('./user.module');
class UserConfig extends Model {}

UserConfig.init(
  {
    // 在这里定义模型属性
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    account: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    bg: {
      type: DataTypes.CHAR,
      defaultValue: 'http://wuyupei.top:8888/upload/1652176775531.jpg',
    },
    searchconfig: {
      type: DataTypes.TEXT,
      defaultValue: ' ',
    },
    menuconfig: {
      type: DataTypes.TEXT,
      defaultValue: ' ',
    },
    blur: {
      type: DataTypes.CHAR,
      defaultValue: '0',
    },
    radius: {
      type: DataTypes.CHAR,
      defaultValue: '0',
    },
    createdAt: {
      type: DataTypes.TIME,
      defaultValue: true,
    },
    updatedAt: {
      type: DataTypes.TIME,
      defaultValue: true,
    },
  },
  {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'UserConfig', // 我们需要选择模型名称
  }
);

UserConfig.belongsTo(User, {});

UserConfig.sync({ alter: true });

module.exports = UserConfig;

// id  account password mail bg radius blur searchconfig menuconfig
