"use strict";
var mongoose = require('mongoose').set('debug', false);
var config = require('../config');
// one connection
var uri = 'mongodb://' + config.mongodb.host + ":" + config.mongodb.port + '/' + config.mongodb.database;
// var uri = 'mongodb://' + config.mongodb.user + ":" + config.mongodb.pass + "@" + config.mongodb.host + ":" + config.mongodb.port + '/' + config.mongodb.database; //+ "?authMode=scram-sha1&rm.tcpNoDelay=true";
console.log("URI db Mongo =========== ", uri)
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}
mongoose.connect(uri, options, function (error) {
    "use strict";
    if (error) {
        console.log(error);
    } else {
        console.log("Connection to mongo successful");
    }
});
mongoose.Promise = require('q').Promise;

module.exports = mongoose;