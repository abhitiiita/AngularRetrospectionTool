'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

var CommentSchema = new Schema({
	positives : [String],
	negatives : [String],
	sprintId : {
		type: Schema.ObjectId,
		ref: 'Sprint'
	},
	owner : {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Comments', CommentSchema);
