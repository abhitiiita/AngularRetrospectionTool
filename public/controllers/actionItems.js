'use strict';
angular.module('Retrospection').controller('ActionItem',['$scope','$stateParams', 'AuthenticationService', 
	'ActionItemService', 'Socket','sprintDetails','teamMembers', 'actionItemsList',
	function($scope, $stateParams, AuthenticationService, ActionItemService, Socket, sprintDetails, teamMembers, actionItemsList) {
		$scope.authentication = AuthenticationService;

		$scope.actionItemsList = actionItemsList.data;
		$scope.newActionItem = {};
		$scope.actionItemNullError = "";
		$scope.actionItemOwnerError = "";
		$scope.teamMembers = teamMembers.data;
		$scope.isOwner = AuthenticationService.hasSprintAuthorization(sprintDetails.data);

		$scope.addActionItem = function(){
			//console.log($scope.newActionItem.title);
			if (!$scope.newActionItem.title || !$scope.newActionItem.title.trim().length) {
				$scope.actionItemNullError = "Action Item can't be null";
				return;
			}
			if (!$scope.newActionItem.owner) {
				$scope.actionItemOwnerError = "Please select an owner for the action item";
				return;
			}
			$scope.newActionItem.owner = $scope.newActionItem.owner.email;
			$scope.newActionItem.sprint = $stateParams.sprintId;
			ActionItemService.saveActionItem($scope.newActionItem).success(function(data) {
				$scope.newActionItem = {};
				return;
			});
				
		};

		Socket.on('actionItem.added', function(){
			ActionItemService.getActionItemsBySprint($stateParams.sprintId).success(function(data){
				$scope.actionItemsList = data;
			});
		});
		$scope.removeActionItem = function(actionItem) {
			//$scope.actionItemsList.splice($scope.actionItemsList.indexOf(comment),1);
			ActionItemService.deleteActionItem(actionItem).success(function(data) {
				return;
			});
		};
	}
]);
