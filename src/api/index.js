const axios = require("axios")
function getAccess_token(appid, secret) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
      )
      .then((res) => {
        resolve(res.data.access_token);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function getUserInfo(access_token, openid) {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${access_token}&openid=${openid}&lang=zh_CN`).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = {
  getAccess_token,
  getUserInfo
}