angular.module('Retrospection').controller('Header', ['$scope', 'AuthenticationService', '$cookies', '$state', 'AuthTokenService',
	function($scope, AuthenticationService, $cookies, $state, AuthTokenService) {
		'use strict';
		$scope.authentication = AuthenticationService;

		$scope.logout = function() {
			AuthenticationService.logout().success(function() {
				$scope.authentication.user = null;
				//$cookies.putObject('user', null);
				AuthTokenService.setToken();
				$state.go('signin');
			});
		};
	}
]);