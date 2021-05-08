var mSchema = {};
mSchema.mongoose = require('./dbMongo');
var q = require('q');
var util = require('util');
var Schema = mSchema.mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed;
var Util = require('../utilities/helpers');
//--------------------------------------------------
mSchema.ObjectId = ObjectId;
mSchema.Mixed = Mixed;

// --------------------------------------------------

function BaseSchema() {
    Schema.apply(this, arguments);
    this.add({
        created: {
            type: Number,
            default: 0
        },
        updated: {
            type: Number,
            default: 0
        },
        deleted: {
            type: Number,
            default: 0
        }
    });

    this.methods.saveDoc = function () {
        if (this.isNew) {
            this.created = Util.time_now();
        } else {
            this.updated = Util.time_now();
        }
        return this.save()
    };
    this.methods.removeDoc = function () {
        this.deleted = Util.time_now();
        return this.save()
    };

    this.statics.removeDoc = function () {
        var c = arguments[0];
        var ok = 0;
        var fail = 0;
        return this.find(c).then(function (rs) {
            return q.all(rs.map(function (item) {
                return item.removeDoc().then(function (rs) {
                    if (rs) {
                        ok += 1;
                        return true
                    }
                    fail++;
                    return false;
                });
            })).then(function (rs) {
                return {ok: ok, fail: fail};
            })
        });

    };

    this.statics.createDoc = function () {
        var list = [];
        var args1 = arguments[0];
        if (args1 instanceof Array) {
            list = args1;
        }
        else {
            list = [args1];
        }
        list = list.map(function (item) {
            item.created = Util.time_now();
            return item;
        });
        arguments[0] = list;
        return this.create.apply(this, arguments);

    };
    this.statics.updateDoc = function () {
        var doc = arguments[1];

        if (!Object.prototype.hasOwnProperty.call(doc, '$set')) {
            doc.$set = {};
        }
        doc.$set.updated = Util.time_now();
        return this.update.apply(this, arguments)
            .then(res => {
                if (res.ok === 1){
                    return this.findOne(arguments[0])
                }
            });
    };

    this.statics.upsertDoc = function (condition, insertValue) {
        var doc = new this(insertValue);
        doc = doc.toObject();
        doc.created = Util.time_now();
        delete doc._id;
        delete doc.id;
        return this.findOneAndUpdate(condition, doc)
            .then(function (doc) {
                return doc;
            });
    };

    this.statics.findDoc = function () {
        var doc = arguments[0];
        if (!doc) doc = {};
        if (!Object.prototype.hasOwnProperty.call(doc, 'deleted')) {
            doc.deleted = 0;
        }
        return this.find.apply(this, arguments);
    };

    this.statics.findOneDoc = function () {
        var doc = arguments[0];
        if (!Object.prototype.hasOwnProperty.call(doc, 'deleted')) {
            doc.deleted = 0;
        }
        return this.findOne.apply(this, arguments);
    };

    this.set('toObject', {virtuals: true});
    this.set('toJSON', {virtuals: true});
}

util.inherits(BaseSchema, Schema);

//-------------------collection name-------------------------------

mSchema.CollectionName = {
    user: 'user',
    admin: 'admin',
    department: 'department',
    team: 'team',
    member: 'member',
    member_team: 'member_team'
};

//-------------------define schema-------------------------------

mSchema.user = new BaseSchema({
    username: {type: String, require: true, default: ''},
    password: {type: String, require: true, default: ''},
    note: {type: String, require: true, default: ''},
});

mSchema.user.index({username: 1}, {unique: true});

mSchema.admin = new BaseSchema({
    admin_name: {type: String, require: true, default: ''},
    role: {type: Number, require: true, default: 1},
    note: {type: String, require: true, default: ''},
});

mSchema.admin.index({admin_name: 1});

mSchema.department = new BaseSchema({
    department_name: {type: String, require: true, default: ''},
    admin_id : {type: ObjectId, require: true, ref: mSchema.CollectionName.admin},
    note: {type: String, require: true, default: ''},
});

mSchema.department.index({name: 1, admin_id: 1});

mSchema.team = new BaseSchema({
    team_name: {type: String, require: true, default: ''},
    department_id : {type: ObjectId, require: true, ref: mSchema.CollectionName.department},
    note: {type: String, require: true, default: ''},
});

mSchema.team.index({team_name: 1, department_id: 1});

mSchema.member = new BaseSchema({
    member_name: {type: String, require: true, default: ''},
    total_team: {type: Number, require: true, default: 0},
    note: {type: String, require: true, default: ''},
});

mSchema.member.index({member_name: 1});

mSchema.member_team = new BaseSchema({
    member_id: {type: ObjectId, require: true, ref: mSchema.CollectionName.member},
    team_id: {type: ObjectId, require: true, ref: mSchema.CollectionName.team},
    note: {type: String, require: true, default: ''},
});

mSchema.member_team.index({member_id: 1, team_id: 1}, {unique: true});

module.exports = mSchema;


