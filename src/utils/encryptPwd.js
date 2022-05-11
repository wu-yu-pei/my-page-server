const md5 = require('md5');

const encryPwdpwd = (pwd) => md5(pwd);

module.exports = encryPwdpwd;
