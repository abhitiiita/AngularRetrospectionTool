'use strict';

var teams = require('../controllers/team');
var users = require('../controllers/user');

module.exports = function(app) {
	app.route('/teams')
		.get(teams.getAll)
		.post(users.requiresLogin, teams.create);

	app.route('/teams/:teamId')
		.get(teams.getOne)
		.delete(teams.delete);
};