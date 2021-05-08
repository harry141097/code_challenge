module.exports = function (key, expiredTime) {
    var self = this;
    return new Promise(function(resolve, reject) {
        if (typeof key != 'string') {
            reject(new Error("Key argument must be string"));
            return;
        }
        if (typeof expiredTime != "number"){
            reject(new Error("expiredTime argument must be number"));
            return;
        }
        self.redisClient.send_command('EXPIRE', [key, expiredTime], function (err, value) {
            if (err) {
                reject(err);
                return;
            }
            var result;
            try {
                result = JSON.parse(value);
                resolve(result);
            } catch (err) {
                resolve(value);
            }
        });
    });
}