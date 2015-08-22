'use strict';

var actions = require('../controllers/actions');

module.exports = function(app) {
	app.route('/actions').post(actions.create);
	app.route('/actions/user/:userEmail').get(actions.getActionsByUser);
	app.route('/actions/sprint/:sprintId').get(actions.getActionsBySprint);

	app.use('/actions/:actionId', actions.actionByID);
	app.route('/actions/:actionId')
		.put(actions.update)
		.delete(actions.delete);
};