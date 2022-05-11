const sequelize = require('../database/index');
const { DataTypes, Model } = require('sequelize');

class User extends Model {}

User.init(
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
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    mail: {
      type: DataTypes.CHAR,
      allowNull: false,
      defaultValue: true,
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
    modelName: 'User', // 我们需要选择模型名称
  }
);

User.sync({ alter: true });

module.exports = User;

// id  account password mail bg radius blur searchconfig menuconfig
