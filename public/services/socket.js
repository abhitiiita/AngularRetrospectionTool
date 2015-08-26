angular.module('Retrospection').factory('Socket',['socketFactory','$location',
	function(socketFactory, $location){
		'use strict';
		return socketFactory({
			prefix: '',
			ioSocket: io.connect($location.protocol()+'://'+$location.host()+':'+$location.port())
		});
	}
]);