'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

var ActionSchema = new Schema({
	title : String,
	created: {
		type: Date,
		default: Date.now
	},
	sprint: {
		type: Schema.ObjectId,
		ref: 'Sprint'
	},
	owner : String, 
	status : {
		type: Boolean, 
		default: false
	}
});

module.exports = mongoose.model('Action', ActionSchema);