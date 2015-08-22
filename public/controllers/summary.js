'use strict';
angular.module('Retrospection').controller('Summary',['$scope', '$state' ,'$stateParams','CommentsService',
	'Socket','AuthenticationService', 'comments', 'sprintDetails','teamMembers', 'isLoggedIn',
	function($scope, $state, $stateParams, CommentsService, Socket, AuthenticationService, comments, 
		sprintDetails, teamMembers, isLoggedIn) {

		$scope.teamMembers = teamMembers.data;
		$scope.authentication = AuthenticationService;
		$scope.comments = comments.data;
		//$scope.addedCount = 0;
		//$scope.teamSize = $scope.teamMembers.length;
		//console.log($scope.teamMembers.length);

		function addOwner() {
			for(var i=0; i<$scope.comments.length; i++) {
				for(var j=0; j<$scope.teamMembers.length; j++) {
					if($scope.teamMembers[j]._id === $scope.comments[i].owner) {
						$scope.teamMembers[j].added = 1;
						//$scope.addedCount++;
					}
				}
			}
		};

		addOwner();

		$scope.isOwner = AuthenticationService.hasSprintAuthorization(sprintDetails.data);

		Socket.on('comments.added', function(){
			CommentsService.getRetroComments($stateParams.sprintId).success(function(data){
				$scope.comments = data;
				addOwner();
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