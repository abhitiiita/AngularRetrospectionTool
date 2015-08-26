// you can't directly add $state as dependency in interceptor as it 
// will cause circuilar dependency
// http://stackoverflow.com/questions/20230691/injecting-state-ui-router-into-http-interceptor-causes-circular-dependency 
angular.module('Retrospection').factory('Interceptor', ['$q','$injector', '$rootScope',
	function($q, $injector, $rootScope) {
		'use strict';
		var interceptorFacoty = {};
		interceptorFacoty.responseError = function(response) {
			switch(response.status) {
				case 401:
					$rootScope.$broadcast('unauthorized');
					$injector.get('$state').transitionTo('signin');
					break;
				case 400:
					$injector.get('$state').transitionTo('errorView');
					break;
			}
			return $q.reject(response);
		};
		return interceptorFacoty;
	}
]);