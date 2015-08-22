'use strict';

var Comments = require('../models/comments');
var _ = require('lodash');

exports.getSprintComments = function(req, res) {
	//filter Comments table on the basis of sprintID
	Comments.find({sprintId:req.params.sprintId}, function(err, comments){
		if (err) {
			return res.status(400).send({
				message: 'Unable to load the data'
			});
		} else {
			res.json(comments);
		}
	});
};

exports.create = function(req, res) {
	var comments = new Comments();
	comments.positives = req.body.positives;
	comments.negatives = req.body.negatives;
	comments.sprintId  = req.body.sprintId;
	comments.owner     = req.body.owner;

	comments.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: 'Unable to add Comments try again'
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('comments.added');
			res.json(comments);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.comment);
};

exports.update = function(req, res) {
	var comment = req.comment;
	comment = _.extend(comment, req.body);
	if(comment){
		comment.save(function(err) {
			if(err) {
				return res.status(400).send({
					message: 'Unable to update comments try again'
				});
			} else {
				var socketio = req.app.get('socketio');
				socketio.sockets.emit('comments.added');
				res.json(comment);
			}
		});
	}
};

exports.commentByID = function(req, res, next){
	Comments.findById(req.params.commentId).exec(function(err, comment) {
		if(err) return next(err);
		if(!comment) return next(new Error('Failed to load comment'));
		req.comment = comment;
		next();
	});
};

