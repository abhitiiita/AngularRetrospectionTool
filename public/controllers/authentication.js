'use strict';
angular.module('Retrospection').controller('Authentication',['$scope','AuthenticationService', '$state','$cookies', 'teams',
	function($scope, AuthenticationService, $state, $cookies, teams) {
		$scope.user = {};
		$scope.authentication = AuthenticationService;
		$scope.teams = teams.data;
		
		if ($scope.authentication.user) $state.go('profile');

		$scope.login = function(isValid) {
			if(isValid) {
				AuthenticationService.login($scope.user).success(function(response) {
					if(response.user) {
						$scope.authentication.user = response.user;
						$state.go('profile');
					} else {
						$scope.errorMessage = response.errorMsg;
					}
				});
			}
		};

		$scope.signup = function(isValid) {
			if(isValid) {
				AuthenticationService.signup($scope.user).success(function(response) {
					if(response.user) {
						$scope.authentication.user = response.user;
						$state.go('profile');
					} else {
						$scope.errorMessage = response.errorMsg;
					}			
				});
			}
		};
	}
]);
