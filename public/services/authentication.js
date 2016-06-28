angular.module('Retrospection').factory('AuthenticationService', ['$cookies', '$http', 'SprintService', '$q',
	'$state', 'AuthTokenService', function($cookies, $http, SprintService, $q, $state, AuthTokenService){
		'use strict';

		var authenticationFactory = {};
		authenticationFactory.user = null;

		authenticationFactory.isLoggedIn = function() {	
			var defer = $q.defer();
			if(authenticationFactory.user) {
				defer.resolve(authenticationFactory.user);
				return defer.promise;
			}
			
			//check for token if token exist then fetch the user
			if(!AuthTokenService.getToken()) {
				defer.reject(null);
			} else {
				//token exist but no user info, so fetch from server
				$http.get('/users/me').success(function(user) {
					authenticationFactory.user = user;
					if(authenticationFactory.user) {
						defer.resolve(authenticationFactory.user);
					} else {
						defer.reject(null);
					}
				});
			}
			return defer.promise;
		};

		authenticationFactory.checkTeam = function(team) {
			var defer = $q.defer();
			if(team == "Other") {
				defer.reject(null);
				$state.go('teamChange');
			} else {
				defer.resolve(true);
			}
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
			return $http.post('/users/password/'+userId, password);
		};

		authenticationFactory.getTeamsList = function() {
			return $http.get('/teams');
		};

		authenticationFactory.createTeam = function(newTeam) {
			return $http.post('/teams', newTeam);
		};

		authenticationFactory.updateTeam = function(teamName, userId) {
			return $http.post('/users/team/'+userId, teamName);
		};

		return authenticationFactory;
	}
]);