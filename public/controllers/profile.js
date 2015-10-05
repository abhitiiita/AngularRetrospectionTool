angular.module('Retrospection').controller('Profile', ['AuthenticationService', 'Socket', 'ActionItemService',
 	'sprintData', 'actionItemsList', '$scope', 'teamMembers',
	function(AuthenticationService, Socket, ActionItemService, sprintData, actionItemsList, $scope, teamMembers) {
		'use strict';

		$scope.latestSprint = sprintData.data[0];
		$scope.actionItemsList = actionItemsList.data;
		$scope.teamMembers = teamMembers;
		$scope.authentication = AuthenticationService;

		Socket.on('actionItem.added', function(){
			ActionItemService.getActionItemsByUser($scope.authentication.user.email).success(function(data){
				console.log("Data from ActionItemService"+data);
				$scope.actionItemsList = data;
			});
		});

		$scope.updateActionItems = function(actionItem) {
			actionItem.status = !actionItem.status;
			ActionItemService.updateActionItem(actionItem).success(function(data) {
				console.log(data);
				return;
			});
		};
	}
]);