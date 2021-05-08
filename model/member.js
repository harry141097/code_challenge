'use strict';

const Model = function () {
    let self = this;
    self.mongodb = require('../core/dbModel');
    self.q = require('q');
};
let ModelPrototype = Model.prototype;

ModelPrototype.getMember = function (payload) {
    let self = this;
    return self.q.when().then(() => {
        return self.mongodb.member.findDoc(payload).skip(0).limit(1500)
    }).then(member => {
        return member
    }).catch(err => {
        throw new Error(err.message)
    })
}

ModelPrototype.getTeamOfMember = function (payload) {
    let self = this;
    return self.q.when().then(() => {
        let nested_populate = {
            path: 'team_id',
            populate: {
                path: 'department_id',
                model: 'department',
                populate: {
                    path: 'admin_id',
                    model: 'admin'
                }
            }
        }
        return self.mongodb.member_team.findDoc(payload).populate(nested_populate)
    }).then(member => {
        return member
    }).catch(err => {
        throw new Error(err.message)
    })
}

module.exports = Model;
