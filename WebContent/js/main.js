﻿var myApp = angular.module("myApp", [ 'ui.bootstrap' ]).filter('start',
		function() {
			return function(input, start) {
				if (!input || !input.length) {
					return;
				}

				start = +start;
				return input.slice(start);
			};
		}).filter('lv', function() {
	return function(number) {
		if (number === 'N') {
			return '一般';
		} else if (number === 'G') {
			return '黃金';
		} else if (number === 'D') {
			return '鑽石';
		}

	};
});

myApp.service('MyService', function($rootScope) {
	  var Messenger = {
	    Temp: "",
	    TempId: "",
	    tempMethod: function(Id) {
	    	console.log(Id)
	      TempId = Id;
	      $rootScope.$broadcast('FirstCtrlMethod');
	    }
	  };
	  return Messenger;
	});

myApp.factory('Service', function() {

	var Service = {
		foo : 'Shared service'
	};

	return Service;
});

myApp.controller('AppController3', [ '$scope', '$http',
		function($scope, $http) {
			$http.get('json/level.json').success(function(data) {
				// you can do some processing here
				$scope.userLevel = data;
			});

		} ]);
