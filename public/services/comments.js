'use strict';

angular.module('Retrospection').factory('CommentsService', function($http){
	var commentsFactory = {};
	commentsFactory.submitComments = function(sprintComments) {
		return $http.post('/comments', sprintComments);
	};

	commentsFactory.getRetroComments = function(sprintId) {
		return $http.get('/'+sprintId+'/comments');
	};

	commentsFactory.updateRetroComments = function(comments) {
		$http.put('/comments/'+comments._id, comments);
	};

	commentsFactory.updateRetroCommentsBatch = function(commentsArray) {
		var x;
	//	console.log(comments);
		for(x in commentsArray){
			//console.log(x);
			//console.log(comments[x]);
			$http.put('/comments/'+commentsArray[x]._id, commentsArray[x]);
		}
		return;
	};

	return commentsFactory;
});