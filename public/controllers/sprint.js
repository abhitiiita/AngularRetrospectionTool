angular.module('Retrospection').controller('Sprint',['$scope', '$state', 'SprintService', 'AuthenticationService', 'sprintData',
	function($scope, $state, SprintService, AuthenticationService, sprintData){
		'use strict';

		$scope.authentication = AuthenticationService;
		$scope.sprint = {};		
		$scope.isError = false;
		$scope.errorMessage = "Sprint name can't be null";

		$scope.sprintData = sprintData.data;
		$scope.createSprint = function(){
			var newSprinttitle = $scope.sprint.title;
			if(!newSprinttitle || !newSprinttitle.trim().length){
				$scope.isError = true;
				return;
			}
			
			//load user specific data team and owner
			$scope.sprint.team = $scope.authentication.user.team;
			$scope.sprint.owner = $scope.authentication.user._id;

			//call service to save this sprint
			SprintService.createSprint($scope.sprint).success(function(data){
				//console.log(data);
				$state.go('addComments',{sprintId: data._id});
			});	
		};
	}
]);