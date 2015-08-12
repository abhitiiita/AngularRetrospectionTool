'use strict';

var actions = require('../controllers/actions');

module.exports = function(app) {
	app.route('/actions').post(actions.create);
	app.route('/actions/:actionId').delete(actions.delete);
//	app.route('/actions/team/:teamName').get(actions.getActionsByTeam);
	app.route('/actions/user/:userId').get(actions.getActionsByUser);
	app.route('/actions/sprint/:sprintId').get(actions.getActionsBySprint);
};