'use strict';

angular.module('Retrospection').factory('Socket',['socketFactory',
	function(socketFactory){
		return socketFactory({
			prefix: '',
			ioSocket: io.connect('http://localhost:8081')
		});
	}
]);