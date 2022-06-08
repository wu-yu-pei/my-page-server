const { Server } = require("socket.io");
module.exports = function (server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST']
    }
  });


  io.on('connect', async (socket) => {
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
  })
}