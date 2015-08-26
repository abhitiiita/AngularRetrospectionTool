angular.module('Retrospection').config(['$httpProvider', 
	function($httpProvider) {
		'use strict';
		$httpProvider.interceptors.push('Interceptor');
	}
]);