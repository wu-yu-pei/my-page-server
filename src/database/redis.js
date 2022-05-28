const Redis = require("ioredis")

const { REDISCONFING } = require('../config/index')


module.exports = new Redis(REDISCONFING);