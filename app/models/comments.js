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
	}
});

module.exports = mongoose.model('Comments', CommentSchema);
