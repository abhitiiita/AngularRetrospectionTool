'use strict';

var Team = require('../models/team');

module.exports.getAll = function(req, res) {
	Team.find().exec(function(err, teams) {
		if(err) {
			return res.status(400).send({ message: 'Unable to get teams. Try again!!'});
		}
		res.json(teams);
	});
};

module.exports.getOne = function(req, res) {
	Team.find({_id:req.params.teamId}).exec(function(err, team) {
		if(err) {
			return res.status(400).send({message: 'Unable to fetch team by id.'})
		}
		res.json(team);
	});
};

module.exports.create = function(req, res) {
	var newTeam = new Team();
	newTeam.teamName = req.body.teamName.trim();
	
	newTeam.teamKey = newTeam.teamName;
	newTeam.teamKey = newTeam.teamKey.toLowerCase();
	//replace all whitespaces in the string
	newTeam.teamKey = newTeam.teamKey.replace(/\s+/g, '');
	newTeam.managersList = req.body.managersList;

	Team.findOne({teamKey:newTeam.teamKey}).exec(function(err, team) {
		if(err) return res.status(400).send({message: 'Unable to fetch team try again'});
		if(team) return res.json({success:false, errorMsg:'Team already exist in DB'});

		newTeam.save(function(err) {
			if(err) {
				return res.status(400).send({ message: 'Unable to add Comments try again'});
			} else {
				res.json({success:true, errorMsg:''});
			}
		});
	});
};

module.exports.delete = function(req, res) {
	Team.remove({_id:req.params.teamId}).exec(function(err, result) {
		if(err) {
			return res.status(400).send({message:'Unable to delete try again'});
		}
		res.json(result);
	});
};
