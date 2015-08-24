'use strict';

angular.module('Retrospection').config(['$httpProvider', 
	function($httpProvider) {
		$httpProvider.interceptors.push('Interceptor');
	}
]);