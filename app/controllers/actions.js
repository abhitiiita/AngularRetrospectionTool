'use strict';

var Action = require('../models/actions');
var _ = require('lodash');

module.exports.create = function(req, res) {
	var action = new Action();
	action.title = req.body.title;
	action.owner = req.body.owner;
	action.sprint = req.body.sprint;
	action.status = req.body.status || false;

	action.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: 'Unable to add ActionItem try again'
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('actionItem.added');
			res.json(action);
		}
	});
};

module.exports.delete = function(req, res) {
	Action.remove({_id:req.params.actionId}).exec(function(err, result) {
		if(err) {
			return res.status(400).send({message:'Unable to delete try again'});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('actionItem.added');
			res.json(result);
		}
	});
};

module.exports.update = function(req, res) {
	var action = req.action;
	action = _.extend(action, req.body);
	if(action) {
		action.save(function(err) {
			if(err) {
				return res.status(400).send({
					message: 'Unable to update comments try again'
				});
			} else {
				res.json(action);
			}
		});
	}
};

module.exports.actionByID = function(req, res, next) {
	Action.findById(req.params.actionId).exec(function(err, action) {
		if(err) return next(err);
		if(!action) return next(new Error('Failed to load action'));
		req.action = action;
		next();
	});
};

/*
module.exports.getActionsByTeam = function(req, res) {
	Action.find({team:req.params.teamName}).exec(function(err, actions) {
		if(err) {
			return res.status(400).send({message:'Unable to fetch data try again'});
		} else {
			res.json(actions);
		}
	});
};
*/
module.exports.getActionsByUser = function(req, res) {
	console.log(req.params.userEmail);
	Action.find({owner:req.params.userEmail}).exec(function(err, actions) {
		if(err) {
			return res.status(400).send({message:'Unable to fetch data try again'});
		} else {
			res.json(actions);
		}

	});
};

module.exports.getActionsBySprint = function(req, res) {
	Action.find({sprint:req.params.sprintId}).exec(function(err, actions) {
		if(err) {
			return res.status(400).send({message:'Unable to fetch data try again'});
		} else {
			res.json(actions);
		}
	});
};