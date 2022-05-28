const { APPID, SECRE } = require('../config/index')
const { getAccess_token } = require('../api/index')
const parseString = require('xml2js').parseString;
const axios = require('axios')
const redis = require('../database/redis')
const User = require('../module/user.module')

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
            expire_seconds: 120,
            action_info: {
              scene: {
                scene_id,
                scene_str: 'my-page',
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

  async check(scene_id) {
    const res = await redis.get(scene_id)
    const userInfo = await User.findOne({
      where: {
        openId: res
      }
    })
    if (res) {
      return {
        status: 1,
        userInfo: userInfo
      }
    } else {
      return {
        status: 0
      }
    }
  }

  async post(xml) {
    const xmlData = String(xml);

    let message = ''


    const textMesg = async (from, to, text) => {
      return `<xml>
                <ToUserName><![CDATA[${from}]]></ToUserName>
                <FromUserName><![CDATA[${to}]]></FromUserName>
                <CreateTime>${+new Date()}</CreateTime>
                <MsgType><![CDATA[text]]></MsgType>
                <Content><![CDATA[${text}]]></Content>
              </xml>`;
    };

    parseString(xmlData, async (err, res) => {
      const from = res.xml.FromUserName;
      const to = res.xml.ToUserName;
      const type = res.xml.Event[0]
      const userName = res.xml.FromUserName[0]
      const EventKey = res.xml.EventKey[0]


      // 注册
      if (type === 'subscribe') {
        console.log('关注了');
        // 创建用户  到数据库
        const user = {
          openId: userName,
          userImg: 'http://www.baidu.com',
          userName: '微信用户' +userName.slice(0, 4)
        }

        await User.create(user)

        // redis中存缓存
        if (isNaN(Number(EventKey))) {
          redis.set(EventKey.split('_')[1], user.openId, 'EX', 120)
        } else {
          redis.set(EventKey, user.openId, 'EX', 120)
        }
        message = textMesg(from, to, '感谢关注!')
      }
      // 登录
      if (type === 'SCAN') {
        redis.set(EventKey, userName, 'EX', 120)
        message = textMesg(from, to, '欢迎回来!')
      }
      // 取关
      if (type === 'unsubscribe') {
        console.log('取关了,应该删除用户信息');
      }
    });

    return message
  }
}

module.exports = new loginService();
