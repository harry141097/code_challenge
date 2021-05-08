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

    // let channelSplit = channel.split('*');
    // let regexCreated = new RegExp(`${channelSplit.join('.+')}`, 'g');

    sub.on("pmessage", function (pattern, chan, message) {
        if(pattern == channel){
            callback(chan, message)
        }
    });
    sub.on('connect', function () {
        console.log('Connected to redis', sub.connection_options, sub.selected_db)
    });
    sub.on('psubscribe', function (pattern, count) {
        if(pattern == channel){
            console.log('p_subscribed ok!', pattern, count)
        }
    })
    sub.psubscribe(channel);
}