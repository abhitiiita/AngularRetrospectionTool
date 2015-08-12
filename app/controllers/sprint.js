'use strict';

var Sprint = require('../models/sprint');

module.exports.createSprint = function(req, res) {

	var sprint = new Sprint();
	sprint.title = req.body.title;
	sprint.team  = req.body.team;
	sprint.owner = req.body.owner;
	sprint.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: 'Unable to add Comments try again'
			});
		} else {
			res.json(sprint);
		}
	});

};

module.exports.readDetails = function(req, res) {
	Sprint.findById(req.params.sprintId).exec(function(err, sprint) {
		if(err) {
			return res.status(400).send({message:'Unable to fetch data try again'});
		} else {
			res.json(sprint);
		}
	});
};

module.exports.getSprintsByTeam = function(req, res) {
	Sprint.find({team:req.params.teamName}).sort({created:-1}).exec(function(err, sprints) {
		if(err) {
			return res.status(400).send({message:'Unable to fetch data try again'});
		} else {
			res.json(sprints);
		}

	});
};