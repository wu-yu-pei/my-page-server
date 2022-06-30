const { Server } = require("socket.io");
const redis = require('../database/redis')
module.exports = function (server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST']
    }
  });

  io.on('connect', async (socket) => {
    // 微信小程序 map
    if (socket.handshake.query.auth) {
      const room = socket.handshake.query.auth
      const type = socket.handshake.query.type

      if (type == 'creater') {
        socket.join(room)
      } else if (type == 'joiner') {
        if (await redis.hget('rooms', room)) {
          socket.join(room)
          io.to(room).emit('location', await redis.hget('rooms', room))
        } else {
          socket.emit('room-no-exit', { code: 500, msg: '房间不存在' })
        }
      }

      socket.on('location', async (res) => {

        if (res.type == 'creater') {
          // 把房主设置进redis里面
          await redis.hset('rooms', { [room]: JSON.stringify(res) })
        }
        socket.to(room).emit('location', res)
      })
    } else {
      // my-page chat
      // 标识
      const name = Math.random()
      socket.name = name
      // redis里设置在线人数
      await redis.hset('users', { [name]: 1 })
      // 广播出去
      socket.broadcast.emit('user join', await redis.hlen('users'))


      // 发来消息
      socket.on('message', async (data) => {
        await redis.rpush("mylist", JSON.stringify(data))
        // 广播
        socket.broadcast.emit("guangbo", data);
      })
      // 断开连接
      socket.on('disconnect', async (e) => {
        // 更新在线人数
        await redis.hdel('users', socket.name)
        socket.broadcast.emit('user join', await redis.hlen('users'))
      });
    }
  })
}