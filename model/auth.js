'use strict';
const config = require('../config')
const helpers = require('../utilities/helpers')

const Model = function () {
    let self = this;
    self.redis = require('../process/redis');
    self.mongodb = require('../core/dbModel');
    self.q = require('q');
};
let ModelPrototype = Model.prototype;

ModelPrototype.login = function (payload) {
    let self = this;
    return self.q.when().then(function () {
        return self.mongodb.user.findOneDoc(payload)
    }).then(user => {
        if (user) {
            return helpers.generateToken(user, config.token, config.token_life).then(token => {
                return self.redis.set_key_message({username: payload.username, token: token}).then(res => {
                    return {username: payload.username, token: token}
                })
            })
        } else {
            throw new Error('User invalid!')
        }
    }).catch(err => {
        throw new Error(err.message)
    })
}

ModelPrototype.register = function (payload) {
    let self = this;
    return self.q.when().then(function () {
        return self.mongodb.user.createDoc(payload)
    }).then(user => {
        return helpers.generateToken(user, config.token, config.token_life)
    }).then(token => {
        return self.redis.set_key_message({username: payload.username, token: token}).then(res => {
            return {username: payload.username, token: token}
        })
    }).catch(err => {
        throw new Error(err.message)
    })
}

module.exports = Model;
