const loginService = require('../service/login.service');
const parseString = require('xml2js').parseString;
const redis = require('../database/redis')

class registerController {
  async login(ctx, next) {

  }

  async qr(ctx, next) {
    ctx.body = await loginService.qr()
  }

  async check(ctx, next) {
    const { scene_id } = ctx.request.query
    const res = await redis.get(scene_id)

    if (res) {
      ctx.body = {
        status: 1,
        userId: res
      }
    } else {
      ctx.body = {
        status: 0
      }
    }
  }

  async post(ctx, next) {

    const xml = ctx.request.body

    const xmlData = String(xml);

    const users = []

    const textMesg = (from, to, text) => {
      return `<xml>
                <ToUserName><![CDATA[${from}]]></ToUserName>
                <FromUserName><![CDATA[${to}]]></FromUserName>
                <CreateTime>${+new Date()}</CreateTime>
                <MsgType><![CDATA[text]]></MsgType>
                <Content><![CDATA[${text}]]></Content>
              </xml>`;
    };

    parseString(xmlData, (err, res) => {
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
          open_id: userName,
        }
        users.push(user)

        // redis中存缓存
        if (isNaN(Number(EventKey))) {
          redis.set(EventKey.split('_')[1], user.open_id)
        } else {
          redis.set(EventKey, user.open_id)
        }
        ctx.body = textMesg(from, to, '感谢关注!')
      }
      // 登录
      if (type === 'SCAN') {
        console.log('又来了');
        ctx.body = textMesg(from, to, '欢迎回来!')
      }
      // 取关
      if (type === 'unsubscribe') {
        console.log('取关了,应该删除用户信息');
      }
    });
  }
}

module.exports = new registerController();
