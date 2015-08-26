angular.module('Retrospection').controller('PasswordHandler', ['$scope', '$state', 'AuthenticationService', 'tokenValidation',
	function($scope, $state, AuthenticationService, tokenValidation) {
		'use strict';

		$scope.resetRequestUserEmail = '';
		$scope.resetRequestSuccessStatus = '';
		$scope.resetRequestErrorStatus = '';
		$scope.newPassword = {};
		$scope.errorMessage = '';
		$scope.isValidToken = tokenValidation ? tokenValidation.data.isValid : false;
		$scope.userId = tokenValidation ? tokenValidation.data.userId : null;

		$scope.resetRequest = function(isValid) {
			$scope.resetRequestErrorStatus = '';
			$scope.resetRequestSuccessStatus = '';
			if(isValid) {
				AuthenticationService.submitResetRequest($scope.resetRequestUserEmail)
				.success(function(response) {
					if(response.success) {
						$scope.resetRequestSuccessStatus = 
						'We’ve sent you an email '+$scope.resetRequestUserEmail +
						'containing a link that will allow you to reset your password for the next 24 hours.';
					} else {
						$scope.resetRequestErrorStatus = response.errorMsg;
					}
				});
			}
		};

		$scope.updatePassword = function(isValid) {
			if(isValid) {
				if($scope.newPassword.value !== $scope.newPassword.confirmValue) {
					$scope.errorMessage = 'Both passwords should match';
					return;
				}
				AuthenticationService.updatePassword($scope.newPassword, $scope.userId).then(function(response) {
					if(response.data.success) {
						$state.go('signin');
					}
				});
			}
		};
	}
]);