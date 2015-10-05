angular.module('Retrospection').controller('Authentication',['$scope','AuthenticationService', 
	'$state', 'teams', '$rootScope', 'AuthTokenService',
	function($scope, AuthenticationService, $state, teams, $rootScope, AuthTokenService) {
		'use strict';
		$scope.user = {};
		$scope.authentication = AuthenticationService;
		$scope.teams = teams.data;
		
		if ($scope.authentication.user) $state.go('profile');

		$rootScope.$on('unauthorized', function() {
        	AuthenticationService.user = null;
        	$state.go('signin');
    	});

		$scope.login = function(isValid) {
			if(isValid) {
				AuthenticationService.login($scope.user).success(function(response) {
					if(response.user) {
						$scope.authentication.user = response.user;
						AuthTokenService.setToken(response.token);
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
						AuthTokenService.setToken(response.token);
						$state.go('profile');
					} else {
						$scope.errorMessage = response.errorMsg;
					}			
				});
			}
		};
	}
]);
