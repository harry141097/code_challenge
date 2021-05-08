module.exports = function(key){
  var self = this;
  return new Promise(function(resolve, reject) {
    if (typeof key != 'string') {
      reject(new Error("Key argument must be string"));
      return;
    }
    self.redisClient.get(key, function (err, value) {
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