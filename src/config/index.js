const PORT = 8888;

// mysql
const DB = 'my-page-dataBase';
const USER = 'root';
// const PASSWORD = '19781209Wyp';
// const HOST = '8.141.63.127';
const PASSWORD = '123456';
const HOST = '127.0.0.1';
const DIALECT = 'mysql';
const TOKEN = 'ABCDEFGHIJKLM';
const APPID = 'wx231e6fc91ca26440';
const SECRE = '5d0efe03af9fa22c2ce1a6efdef441a8';

REDISCONFING = {
  port: 6379, // Redis port
  host: "8.141.63.127", // Redis host
  password: "19781209Wyp",
  db: 0, // Defaults to 0
}


module.exports = {
  PORT,
  DB,
  USER,
  PASSWORD,
  HOST,
  DIALECT,
  TOKEN,
  APPID,
  SECRE,
  REDISCONFING
};
