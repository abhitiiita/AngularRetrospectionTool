'use strict';

angular.module('Retrospection').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('home', {
			url:'/',
			templateUrl: 'views/home.html'
		}).
		state('profile', {
			url: '/main',
			resolve: {
				isLoggedIn : ['AuthenticationService', function(AuthenticationService) {
								return AuthenticationService.isLoggedIn();
				}],
				sprintData: ['SprintService', 'isLoggedIn', function(SprintService, isLoggedIn) {
						return SprintService.loadSprintsData(isLoggedIn.team);
				}],
				actionItemsList : ['isLoggedIn', 'ActionItemService', function(isLoggedIn, ActionItemService) {
						return ActionItemService.getActionItemsByUser(isLoggedIn.email);
				}],
				teamMembers : ['AuthenticationService','isLoggedIn',
					function(AuthenticationService, isLoggedIn) {
						return AuthenticationService.getSprintTeamMembers(isLoggedIn.team);
				}]
			},
			templateUrl : 'views/user/profile.html',
			controller : 'Profile'
		}).
		state('signup', {
			url:'/signup',
			resolve: {
				teams : ['AuthenticationService', function(AuthenticationService) {
					return AuthenticationService.getTeamsList();
				}]
			},
			templateUrl: 'views/user/signup.html',
			controller : 'Authentication'
		}).
		state('signin', {
			url:'/signin',
			resolve: {
				teams : ['AuthenticationService', function(AuthenticationService) {
					return AuthenticationService.getTeamsList();
				}]
			},
			templateUrl: 'views/user/signin.html',
			controller : 'Authentication'
		}).
		state('resetPasswordRequest', {
			url:'/resetpassword',
			resolve: {
				tokenValidation: function(){return null;}
			},
			templateUrl : 'views/user/password_reset.html',
			controller: 'PasswordHandler'
		}).
		state('resetPasswordConfirm', {
			url:'/resetpassword/:resetToken',
			resolve : {
				tokenValidation : ['AuthenticationService', '$stateParams', 
					function(AuthenticationService, $stateParams) {
					return AuthenticationService.confirmResetRequest($stateParams.resetToken);
				}]
			},
			templateUrl: 'views/user/password_update.html',
			controller: 'PasswordHandler'
		}).
		state('createSprint', {
			url: '/create',
			resolve: {
				isLoggedIn : ['AuthenticationService', function(AuthenticationService) {
								return AuthenticationService.isLoggedIn(); }],
				sprintData: function() { return [];}
			},
			templateUrl: 'views/sprint/create_sprint.html',
			controller: 'Sprint'
		}).
		state('addComments', {
			url: '/:sprintId/comments',
			resolve: {
				isLoggedIn : ['AuthenticationService', function(AuthenticationService) {
								return AuthenticationService.isLoggedIn(); }]
			},
			templateUrl: 'views/sprint/add_comments.html'
		}).
		state('sprintView',{
			url: '/sprints',
			resolve: {
				isLoggedIn : ['AuthenticationService', function(AuthenticationService) {
								return AuthenticationService.isLoggedIn();
							  }],
				sprintData: ['SprintService', 'isLoggedIn', function(SprintService, isLoggedIn) {
						return SprintService.loadSprintsData(isLoggedIn.team);
				}]
			},
			templateUrl: 'views/sprint/show_sprints.html',
			controller: 'Sprint'
		}).
		state('summaryView',{
			url: '/sprints/:sprintId',
			resolve: {
				isLoggedIn : ['AuthenticationService',
					function(AuthenticationService) {
						return AuthenticationService.isLoggedIn();
					}],
				comments: ['$stateParams','CommentsService',
					function($stateParams, CommentsService) {
						return CommentsService.getRetroComments($stateParams.sprintId);
					}],
				sprintDetails : ['$stateParams', 'SprintService',
					function($stateParams, SprintService) {
						return SprintService.getSprintDetail($stateParams.sprintId);
					}],
				teamMembers : ['$stateParams', 'AuthenticationService','sprintDetails',
					function($stateParams, AuthenticationService, sprintDetails) {
						return AuthenticationService.getSprintTeamMembers(sprintDetails.data.team);
					}],
				actionItemsList : ['$stateParams', 'ActionItemService', 
					function($stateParams, ActionItemService) {
						return ActionItemService.getActionItemsBySprint($stateParams.sprintId);
					}]
			},
			views : {
				'': {templateUrl: 'views/sprint/summary_view.html'},
				'comments@summaryView' : {
					templateUrl : 'views/sprint/summary_view_comments.html',
					controller : 'Summary'
				},
				'actionItems@summaryView' : {
					templateUrl : 'views/sprint/summary_view_action_items.html',
					controller : 'ActionItem'
				}
			}
		}).
		state('errorView', {
			url: '/errorView',
			templateUrl: 'views/error_view.html'
		});
	}

]);