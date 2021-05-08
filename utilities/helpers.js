var moment = require('../core/datetime');
const jwt = require("jsonwebtoken");
var helpers = {
    time_now: function (format) {
        if (!format)
            return moment().format('X');
        return moment().format(format);
    },
    generateToken: function (user, secretSignature, tokenLife) {
        return new Promise((resolve, reject) => {
            const userData = {
                _id: user._id,
                username: user.username,
                password: user.password,
            }
            jwt.sign(
                {data: userData},
                secretSignature,
                {
                    algorithm: "HS256",
                    expiresIn: tokenLife,
                },
                (error, token) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(token);
                });
        });
    },
    verifyToken: function (token, secretKey) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (error, decoded) => {
                if (error) {
                    return reject(error);
                }
                resolve(decoded);
            });
        });
    }
};

module.exports = helpers;

