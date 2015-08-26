angular.module('Retrospection').controller('Header', ['$scope', 'AuthenticationService', '$cookies', '$state',
	function($scope, AuthenticationService, $cookies, $state) {
		'use strict';
		$scope.authentication = AuthenticationService;

		$scope.logout = function() {
			AuthenticationService.logout().success(function() {
				$scope.authentication.user = null;
				$cookies.putObject('user', null);
				$state.go('home');
			});
		};
	}
]);