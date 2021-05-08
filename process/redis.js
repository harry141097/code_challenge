const Redis = require('../utilities/redis');
const config = require('../config');
const q = require('q');

var RedisProcess = function () {
    var self = this;
    self.q = q;
    self.redis = Redis;
    self.channel_expired_message = `__keyevent@${config.redis.DB}__:expired`
}

var _RedisProcess = RedisProcess.prototype;

_RedisProcess.start = function(){
    var self = this;
    self.subscribe();
}

_RedisProcess.subscribe = function(){
    var self = this;
    self.redis.subscribe(self.channel_expired_message)
}

_RedisProcess.set_key_message = function(data){
    let self = this;
    let key = data.username
    return self.q.when()
        .then(function () {
            return self.redis.set(key, data.token)
        })
        .then(function () {
            return self.redis.setExpireKey(key, config.token_life) // 1h = 3600
        })
}

_RedisProcess.get_key_request = function(data){
    var self = this;
    return self.q.when().then(() => {
        return self.redis.get(data.toString())
    }).then(token => {
        return token
    })
}


module.exports = new RedisProcess();
