'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

var ResetTokenSchema = new Schema({
	hashToken : String,
	created: {
		type: Date,
		default: Date.now
	}, 
	userId : {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('ResetToken', ResetTokenSchema);