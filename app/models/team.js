'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

var teamSchema = new Schema({
	teamName : String,
	teamKey : String, 
	managersList : [String]
});

module.exports = mongoose.model('Team', teamSchema);