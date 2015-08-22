'use strict';
angular.module('Retrospection').controller('Comments',['$scope', '$stateParams', '$state',
	'$location','CommentsService', 'AuthenticationService',
	function($scope, $stateParams, $state, $location, CommentsService, AuthenticationService) {
		$scope.listPosComments = [];
		$scope.listNegComments = [];
		$scope.newPosComment = '';
		$scope.newNegComment = '';
		$scope.isError = false;
		$scope.errorMessage = '';
		$scope.authentication = AuthenticationService;

		$scope.addToPosList = function(){
			var newPosComment = $scope.newPosComment.trim();
			if (!newPosComment.length) {
				return;
			}
			$scope.listPosComments.push(newPosComment);
			$scope.newPosComment = '';
			$scope.isError = $scope.isError && !($scope.listPosComments.length && $scope.listNegComments.length);
		};

		$scope.addToNegList = function(){
			var newNegComment = $scope.newNegComment.trim();
			if (!newNegComment.length) {
				return;
			}
			$scope.listNegComments.push(newNegComment);
			$scope.newNegComment = '';
			$scope.isError = $scope.isError && !($scope.listPosComments.length && $scope.listNegComments.length);
		};

		$scope.removeFromPos = function(comment) {
			$scope.listPosComments.splice($scope.listPosComments.indexOf(comment),1);
		};

		$scope.removeFromNeg = function(comment) {
			$scope.listNegComments.splice($scope.listNegComments.indexOf(comment),1);
		};

		$scope.submitComments = function(){
			if($scope.listPosComments.length === 0 || $scope.listNegComments.length ===0){
				$scope.isError = true;
				$scope.errorMessage = "Please enter atleast one comment in both Positive and Negative section";
				return;
			}

			var sprintComments = {};
			sprintComments.positives = $scope.listPosComments;
			sprintComments.negatives = $scope.listNegComments;
			sprintComments.sprintId  = $stateParams.sprintId;
			sprintComments.owner 	 = $scope.authentication.user;

			CommentsService.submitComments(sprintComments).success(function(data){
				$state.go('summaryView', {sprintId: $stateParams.sprintId});
			});
		};

	}
]);