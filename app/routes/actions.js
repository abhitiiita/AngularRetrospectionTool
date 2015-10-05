'use strict';

var actions = require('../controllers/actions');
var users = require('../controllers/user');

module.exports = function(app) {
	app.route('/actions').post(users.requiresLogin, actions.create);
	app.route('/actions/user/:userEmail').get(users.requiresLogin, actions.getActionsByUser);
	app.route('/actions/sprint/:sprintId').get(users.requiresLogin, actions.getActionsBySprint);

	app.use('/actions/:actionId', users.requiresLogin, actions.actionByID);
	app.route('/actions/:actionId')
		.put(users.requiresLogin, actions.update)
		.delete(users.requiresLogin, actions.delete);
};