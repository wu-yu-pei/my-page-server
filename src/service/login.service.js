const { APPID, SECRE } = require('../config/index')
const { getAccess_token } = require('../api/index')
const axios = require('axios')
class loginService {
  constructor() { }
  async login() {

  }

  async qr() {
    return new Promise(async (resolve, reject) => {
      // 获取access_token
      const access_token = await getAccess_token(APPID, SECRE); // access_token

      const scene_id = Math.floor(Math.random() * 10000);

      // 请求二维码
      axios
        .post('https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=' + access_token,
          {
            action_name: 'QR_SCENE',
            expire_seconds: 60,
            action_info: {
              scene: {
                scene_id,
                scene_str: 'asdfasdf',
              },
            }
          }
        )
        .then((result) => {
          let { ticket } = result.data;
          resolve({
            url: `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`,
            scene_id,
          })
        }).catch(err => {
          reject(err)
        });
    })
  }

  async check() {
    const { scene_id } = req.query
    if (redis[scene_id]) {
      let result = await getUserInfo(accessToken, redis[scene_id])
      res.send(result)
    } else {
      res.send('error')
    }
  }
}

module.exports = new loginService();
