'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

var SprintSchema = new Schema({
	title : String,
	created: {
		type: Date,
		default: Date.now
	},
	team : String, 
	owner : {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Sprint', SprintSchema);