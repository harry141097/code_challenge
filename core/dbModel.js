"use strict";

var dbSchema = require('./dbSchema');
var mongoose = dbSchema.mongoose;
var dbModel = {};
dbModel.mongoose = mongoose;
dbModel.conn = mongoose.conn;
dbModel.dbSchema = dbSchema;
dbModel.Types = mongoose.Types;

dbModel.user = mongoose.model(dbSchema.CollectionName.user, dbSchema.user, dbSchema.CollectionName.user);
dbModel.admin = mongoose.model(dbSchema.CollectionName.admin, dbSchema.admin, dbSchema.CollectionName.admin);
dbModel.department = mongoose.model(dbSchema.CollectionName.department, dbSchema.department, dbSchema.CollectionName.department);
dbModel.team = mongoose.model(dbSchema.CollectionName.team, dbSchema.team, dbSchema.CollectionName.team);
dbModel.member = mongoose.model(dbSchema.CollectionName.member, dbSchema.member, dbSchema.CollectionName.member);
dbModel.member_team = mongoose.model(dbSchema.CollectionName.member_team, dbSchema.member_team, dbSchema.CollectionName.member_team);

module.exports = dbModel;
