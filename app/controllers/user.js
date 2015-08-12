'use strict';

var User = require('../models/user');

module.exports.getUsersByTeam = function(req, res) {
		User.find({team:req.params.team}).exec(function(err, users) {
		if(err) {
			return res.status(400).send({message:'Unable to fetch data try again'});
		} else {
			res.json(users);
		}

	});
};

