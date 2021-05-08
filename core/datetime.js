var config = require('../config');
var moment = require('moment-timezone');
module.exports = function () {
    if (config.timezone) {
        return moment.apply(this, arguments).utcOffset(config.timezone);
    }
    return moment.apply(this, arguments);
};