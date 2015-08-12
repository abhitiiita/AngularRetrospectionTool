'use strict';
angular.module('Retrospection').controller('Profile', ['sprintData', 'actionItemsList', '$scope',
	function(sprintData, actionItemsList, $scope) {
		console.log(sprintData);
		$scope.latestSprint = sprintData.data[0];
		$scope.actionItemsList = actionItemsList.data;
		console.log($scope.actionItemsList);
	}
]);