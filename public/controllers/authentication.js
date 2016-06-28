angular.module('Retrospection').controller('Authentication',['$scope','AuthenticationService', 
	'$state', 'teams', '$rootScope', 'AuthTokenService',
	function($scope, AuthenticationService, $state, teams, $rootScope, AuthTokenService) {
		'use strict';
		$scope.user = {};
		$scope.authentication = AuthenticationService;
		$scope.teams = teams.data;
		
		if ($scope.authentication.user) {
			$state.go('profile');
		}

		$rootScope.$on('unauthorized', function() {
        	AuthenticationService.user = null;
        	$state.go('signin');
    	});

		$scope.login = function(isValid) {
			if(isValid) {
				AuthenticationService.login($scope.user).then(function(response) {
					if(response.data.user) {
						$scope.authentication.user = response.data.user;
						AuthTokenService.setToken(response.data.token);
						$state.go('profile');
					} else {
						$scope.errorMessage = response.data.errorMsg;
					}
				});
			}
		};

		$scope.signup = function(isValid) {
			if(isValid) {
				AuthenticationService.signup($scope.user).then(function(response) {
					if(response.data.user) {
						$scope.authentication.user = response.data.user;
						AuthTokenService.setToken(response.data.token);
						$state.go('profile');
					} else {
						$scope.errorMessage = response.data.errorMsg;
					}			
				});
			}
		};
	}
]);
