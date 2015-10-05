'use strict';

var sprint = require('../controllers/sprint');
var users = require('../controllers/user');

module.exports = function(app) {
	app.route('/sprint')
		.post(users.requiresLogin, sprint.createSprint);
		
	app.route('/sprint/team/:teamName')
		.get(users.requiresLogin, sprint.getSprintsByTeam);

	app.route('/sprint/:sprintId')
		.get(users.requiresLogin, sprint.readDetails);
};