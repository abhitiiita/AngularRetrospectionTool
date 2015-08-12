'use strict';
angular.module('Retrospection').controller('Summary',['$scope', '$state' ,'$stateParams','CommentsService',
	'Socket','AuthenticationService', 'comments', 'sprintDetails','teamMembers', 'isLoggedIn',
	function($scope, $state, $stateParams, CommentsService, Socket, AuthenticationService, comments, 
		sprintDetails, teamMembers, isLoggedIn) {
		console.log(isLoggedIn);
		$scope.authentication = AuthenticationService;
		$scope.comments = comments.data;

		$scope.isOwner = AuthenticationService.hasSprintAuthorization(sprintDetails.data);

		Socket.on('comments.added', function(){
			CommentsService.getRetroComments($stateParams.sprintId).success(function(data){
				$scope.comments = data;
			});
		});

		$scope.removeCommentPositives = function(commentArr, comment){
			commentArr.positives.splice(commentArr.positives.indexOf(comment),1);
			CommentsService.updateRetroComments(commentArr);
		};

		$scope.removeCommentNegatives = function(commentArr, comment){
			commentArr.negatives.splice(commentArr.negatives.indexOf(comment),1);
			CommentsService.updateRetroComments(commentArr);
		};

		$scope.approveComments = function(){
			CommentsService.updateRetroCommentsBatch($scope.comments);
		}
	}
]);