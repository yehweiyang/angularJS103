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
myApp.factory('Scopes', function($rootScope) {
	var mem = {};
	return {
		store : function(key, value) {
			mem[key] = value;
		},
		get : function(key) {
			return mem[key];
		}
	};
});

myApp.service('MyService', function($rootScope) {
	var Messenger = {
		tempMethod : function() {
			$rootScope.$broadcast('FirstCtrlMethod');
		},
		queryMethod : function() {
			$rootScope.$broadcast('SecondCtrlMethod');
		}
	};
	return Messenger;
});

myApp.factory('dataShare', function($rootScope) {
	var service = {};
	service.data = false;
	service.setData = function(data) {
		this.data = data;
		$rootScope.$broadcast('data_send');
	};
	service.sendData = function(data) {
		this.data = data;
		$rootScope.$broadcast('data_shared');
	};
	service.reset = function(data) {
		$rootScope.$broadcast('reset');
	};
	service.getData = function() {
		return this.data;
	};
	return service;
});

myApp.controller('AppController3', [ '$scope', '$http', '$templateCache',
		function($scope, $http, $templateCache) {
			$scope.html3 = 'html/myFile3.html';
			$scope.queryPanel = function() {
			};
			$scope.editPanel = function() {
			};

			$scope.$on('SecondCtrlMethod', function() {
				$scope.value3 = true;
			});
			$http.get('json/level.json').success(function(data) {
				// you can do some processing here
				$scope.userLevel = data;
			});

		} ]);
