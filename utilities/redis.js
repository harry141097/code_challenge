const redis = require('redis');
const configRedis = require('./../config').redis;
const _ = require('lodash');

class Redis {
  constructor() {
    this.redisClient = redis.createClient({
      host: configRedis.Host,
      port: configRedis.Port,
      db: configRedis.DB,
      no_ready_check: true,
      auth_pass: configRedis.Password,
    });

    this.redisPub = redis.createClient({
        host: configRedis.Host,
        port: configRedis.Port,
        db: configRedis.DB,
        no_ready_check: true,
        auth_pass: configRedis.Password,
    });

    this.redisSub = redis.createClient({
        host: configRedis.Host,
        port: configRedis.Port,
        db: configRedis.DB,
        no_ready_check: true,
        auth_pass: configRedis.Password,
    });

    this.redisClient.on('connect', function () {
      console.log("Redis connected!!");
    });
    this.redisClient.on('error', function (err) {
      console.log("Redis connect error:", err);
    });
  }
}
_.extend(Redis.prototype, require('./_redis'));
module.exports = new Redis();