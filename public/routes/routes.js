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
				}]
			},
			templateUrl : 'views/profile.html',
			controller : 'Profile'
		}).
		state('signup', {
			url:'/signup',
			templateUrl: 'views/signup.html'
		}).
		state('signin', {
			url:'/signin',
			templateUrl: 'views/signin.html'
		}).
		state('createSprint', {
			url: '/create',
			resolve: {
				isLoggedIn : ['AuthenticationService', function(AuthenticationService) {
								return AuthenticationService.isLoggedIn(); }],
				sprintData: function() { return [];}
			},
			templateUrl: 'views/create_sprint.html',
			controller: 'Sprint'
		}).
		state('addComments', {
			url: '/:sprintId/comments',
			resolve: {
				isLoggedIn : ['AuthenticationService', function(AuthenticationService) {
								return AuthenticationService.isLoggedIn(); }]
			},
			templateUrl: 'views/add_comments.html'
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
			templateUrl: 'views/show_sprints.html',
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
				'': {templateUrl: 'views/summary_view.html'},
				'comments@summaryView' : {
					templateUrl : 'views/show_comments.html',
					controller : 'Summary'
				},
				'actionItems@summaryView' : {
					templateUrl : 'views/action_items.html',
					controller : 'ActionItem'
				}
			}
		});
	}

]);