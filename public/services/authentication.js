angular.module('Retrospection').factory('AuthenticationService', ['$cookies', '$http', 'SprintService', '$q', '$state',
	function($cookies, $http, SprintService, $q, $state){
		'use strict';

		var authenticationFactory = {};
	//	authenticationFactory.user = $cookies.getObject('user');
		authenticationFactory.user = null;

		authenticationFactory.isLoggedIn = function() {	
			var defer = $q.defer();
			if(authenticationFactory.user) {
				defer.resolve(authenticationFactory.user);
				return defer.promise;
			}
			
			$http.get('/isLoggedIn').success(function(user) {
				authenticationFactory.user = user;
				if(authenticationFactory.user) {
					defer.resolve(authenticationFactory.user);
				} else {
					defer.reject(null);
					$state.go('signin');
				}
			});
			return defer.promise;
		};

		authenticationFactory.login = function(user) {
			return $http.post('/auth/login', user);
		};

		authenticationFactory.signup = function(user) {
			return $http.post('/auth/signup', user);
		};

		authenticationFactory.logout = function() {
			return $http.get('/auth/logout');
		};

		authenticationFactory.hasSprintAuthorization = function(sprint) {
			if(sprint.owner == authenticationFactory.user._id) return true;
			return false;
		};

		authenticationFactory.getSprintTeamMembers = function(team) {
			return $http.get('/users/'+team);
		};

		authenticationFactory.submitResetRequest = function(userEmail) {
			return $http.get('/resetpassword/user/'+userEmail);
		};

		authenticationFactory.confirmResetRequest = function(resetToken) {
			return $http.get('/resetpassword/'+resetToken);
		};

		authenticationFactory.updatePassword = function(password, userId) {
			return $http.put('/users/'+userId, password);
		};

		authenticationFactory.getTeamsList = function() {
			return $http.get('/teams');
		};

		return authenticationFactory;
	}
]);