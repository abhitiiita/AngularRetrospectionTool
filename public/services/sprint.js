'use strict';
angular.module('Retrospection').factory('SprintService', function($http){
	var sprintFactory = {};

	sprintFactory.createSprint = function(sprint){
		return $http.post('/sprint', sprint);
	};

	sprintFactory.loadSprintsData = function(team) {
		return $http.get('/sprint/team/'+team);
	};

	sprintFactory.getSprintDetail = function(sprintId) {
		return $http.get('/sprint/'+sprintId);
	}

	return sprintFactory;
});