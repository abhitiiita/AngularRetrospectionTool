'use strict';

var sprint = require('../controllers/sprint');

module.exports = function(app) {
	app.route('/sprint')
		.post(sprint.createSprint);
		
	app.route('/sprint/team/:teamName')
		.get(sprint.getSprintsByTeam);

	app.route('/sprint/:sprintId')
		.get(sprint.readDetails);
};