'use strict';

var comments = require('../controllers/comments');
var users = require('../controllers/user');

module.exports = function(app) {
	app.route('/:sprintId/comments')
		.get(users.requiresLogin, comments.getSprintComments);

	app.route('/comments')
		.post(users.requiresLogin, comments.create);

	app.use('/comments/:commentId', comments.commentByID);

	app.route('/comments/:commentId')
		.get(users.requiresLogin, comments.read)
		.put(users.requiresLogin, comments.update);
};

