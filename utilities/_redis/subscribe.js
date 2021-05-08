const redis = require('redis');
const configRedis = require('./../../config').redis;
module.exports = function(channel, callback, alterConfig){
  let config = alterConfig || configRedis;
  let sub = alterConfig ? redis.createClient({
    host: config.Host,
    port: config.Port,
    db: config.DB,
    no_ready_check: true,
    auth_pass: config.Password,
  }) : this.redisSub;

  sub.on("message", function (chan, message) {
    if(channel == chan){
        callback(chan, message);
    }
  });
  sub.on('connect', function () {
      console.log('Connected to redis', sub.connection_options, sub.selected_db)
  });
  sub.on('subscribe', function (chan, count) {
      if(chan == channel){
          console.log('subscribed ok!', chan, count)
      }
  })
  sub.subscribe(channel);
}