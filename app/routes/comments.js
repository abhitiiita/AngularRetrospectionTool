'use strict';

var comments = require('../controllers/comments');

module.exports = function(app) {
	app.route('/:sprintId/comments')
		.get(comments.getSprintComments);

	app.route('/comments')
		.post(comments.create);

	app.use('/comments/:commentId', comments.commentByID);

	app.route('/comments/:commentId')
		.get(comments.read)
		.put(comments.update);
};

