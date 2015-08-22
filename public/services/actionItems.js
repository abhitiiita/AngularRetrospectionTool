'use strict';
angular.module('Retrospection').factory('ActionItemService', function($http) {
	var actionItemFactory = {};
	actionItemFactory.saveActionItem = function(actionItem) {
		return $http.post('/actions', actionItem);
	};

	actionItemFactory.getActionItemsBySprint = function(sprintId) {
		return $http.get('/actions/sprint/'+sprintId);
	};

	actionItemFactory.getActionItemsByUser = function(userEmail) {
		return $http.get('/actions/user/'+userEmail);
	};

	actionItemFactory.deleteActionItem = function(actionItem) {
		return $http.delete('/actions/'+actionItem._id);
	};

	actionItemFactory.updateActionItem = function(actionItem) {
		return $http.put('/actions/'+actionItem._id, actionItem);
	};

	return actionItemFactory;
});