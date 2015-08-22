'use strict';

var teams = require('../controllers/team');

module.exports = function(app) {
	app.route('/teams')
		.get(teams.getAll)
		.post(teams.create);

	app.route('/teams/:teamId')
		.get(teams.getOne)
		.delete(teams.delete);
};